import React from 'react';
import { Room } from '../types.ts';
import { Box } from '@mui/material';

interface RoomPreviewProps {
  room: Room;
}

const RoomPreview: React.FC<RoomPreviewProps> = ({ room }) => {
  const { width, height, door } = room;

  return (
    <Box
      sx={{
        maxWidth: '100%',
        maxHeight: '80vh',
        width: { xs: '100%', sm: width },
        height: { xs: 'auto', sm: height },
        aspectRatio: width / height,
        border: '2px solid black',
        position: 'relative',
        padding: { xs: '10px', sm: '0' },
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Render the Door (Basic Door Panel with Handle) */}
      {door && (
        <>
          {/* Door Panel */}
          <Box
            sx={{
              position: 'absolute',
              backgroundColor: 'saddlebrown',
              height: door.width + 20,
              width: '10px',
              borderRadius: '1px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              ...(door.direction === 'left' && {
                left: 0,
                top: (height - door.width) / 2, // Center vertically for left door
              }),
              ...(door.direction === 'right' && {
                right: 0,
                top: (height - door.width) / 2, // Center vertically for right door
              }),
              ...(door.direction === 'top' && {
                top: -30,
                left: door.position, // Position from the left
                transform:'rotate(90deg)'
              }),
              ...(door.direction === 'bottom' && {
                bottom:-30,
                left: door.position, // Position from the left
                transform:'rotate(270deg)'
              }),
            }}
          >
            {/* Door Handle */}
            <Box
              sx={{
                position: 'absolute',
                width: '6px',
                height: '10px',
                backgroundColor: 'goldenrod', // Handle color
                borderRadius: '3px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)', // Small shadow for depth
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)', // Center the handle on the door panel
              }}
            />
          </Box>
        </>
      )}

      {/* Render Racks */}
      {room.racks?.map((rack) => (
        <Box
          key={rack.id}
          sx={{
            position: 'absolute',
            width: rack.width,
            height: rack.height,
            left: rack.x,
            top: rack.y,
            backgroundColor: rack.orientation === 'front' ? 'lightgreen' : 'lightcoral',
            borderRadius: '3px',
          }}
        />
      ))}
    </Box>
  );
};

export default RoomPreview;
