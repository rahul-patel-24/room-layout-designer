import React from 'react';
import { Box } from '@mui/material';
import { Rack as RackType } from '../types.ts';

interface RackProps extends RackType {
  roomWidth: number; // Total room width for size calculation
  roomHeight: number; // Total room height for size calculation
}

const Rack: React.FC<RackProps> = ({ width, height, x, y, frontSideDirection, id, roomWidth, roomHeight }) => {
  const calculateRackSize = (rackWidth: number, rackHeight: number) => ({
    width: (rackWidth / roomWidth) * 100,
    height: (rackHeight / roomHeight) * 100,
  });

  const getBorderStyles = (direction: string) => {
    const baseBorder = '1px dotted black';
    let topBorder = baseBorder;
    let bottomBorder = baseBorder;
    let leftBorder = baseBorder;
    let rightBorder = baseBorder;

    switch (direction) {
      case 'north':
        topBorder = '5px solid green';
        bottomBorder = '2px dotted red';
        break;
      case 'south':
        topBorder = '2px dotted red';
        bottomBorder = '5px solid green';
        break;
      case 'east':
        leftBorder = '2px dotted red';
        rightBorder = '5px solid green';
        break;
      case 'west':
        leftBorder = '5px solid green';
        rightBorder = '2px dotted red';
        break;
    }

    return {
      borderTop: topBorder,
      borderBottom: bottomBorder,
      borderLeft: leftBorder,
      borderRight: rightBorder,
    };
  };

  const { width: rackWidth, height: rackHeight } = calculateRackSize(width, height);
  const borderStyles = getBorderStyles(frontSideDirection);

  return (
    <Box
      key={id}
      sx={{
        position: 'absolute',
        width: `${rackWidth}%`,
        height: `${rackHeight}%`,
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: 'white',
        ...borderStyles,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Rack {height} * {width}
    </Box>
  );
};

export default Rack;
