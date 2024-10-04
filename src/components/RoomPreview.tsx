// RoomPreview.tsx
import React from 'react';
import { Room } from '../types.ts';
import { Box } from '@mui/material';
import Door from './Door'; // Import the Door component

interface RoomPreviewProps {
  room: Room;
}

const RoomPreview: React.FC<RoomPreviewProps> = ({ room }) => {
  const { width, height, door } = room;

  const calculateRackSize = (rackWidth: number, rackHeight: number) => ({
    width: (rackWidth / width) * 100,
    height: (rackHeight / height) * 100,
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

  return (
    <Box
      sx={{
        maxWidth: '100%',
        maxHeight: '80vh',
        width: '100%',
        height: 'auto',
        aspectRatio: `${width} / ${height}`,
        border: '2px solid black',
        position: 'relative',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Render the Door */}
      {door && <Door width={door.width} direction={door.direction} position={door.position} />}

      {/* Render Racks */}
      {room.racks?.map((rack) => {
        const { width: rackWidth, height: rackHeight } = calculateRackSize(rack.width, rack.height);
        const borderStyles = getBorderStyles(rack.frontSideDirection);

        return (
          <Box
            key={rack.id}
            sx={{
              position: 'absolute',
              width: `${rackWidth}%`,
              height: `${rackHeight}%`,
              left: `${(rack.x / width) * 100}%`,
              top: `${(rack.y / height) * 100}%`,
              backgroundColor: 'white',
              ...borderStyles,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Rack {rack.height} * {rack.width}
          </Box>
        );
      })}
    </Box>
  );
};

export default RoomPreview;
