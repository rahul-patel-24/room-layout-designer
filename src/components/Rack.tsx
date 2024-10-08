import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Rack as RackType } from '../types.ts';
import { faSyncAlt, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome Component

interface RackProps extends RackType {
  roomWidth: number;
  roomHeight: number;
  onRotate: (id: string) => void;
  onDelete: (id: string) => void;
}

const Rack: React.FC<RackProps> = ({ width, height, x, y, frontSideDirection, id, roomWidth, roomHeight, onRotate, onDelete }) => {
  const [hovered, setHovered] = useState(false); // State to track hover

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
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.05)' }, // Slight zoom on hover
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Rack {height} * {width}

      {/* Rotate and Delete Icons */}
      {hovered && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            gap: '5px',
          }}
        >
          <IconButton onClick={() => onRotate(id)} size="small">
            <FontAwesomeIcon icon={faSyncAlt} />
          </IconButton>
          <IconButton onClick={() => onDelete(id)} size="small">
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Rack;
