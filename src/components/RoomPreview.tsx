import React from 'react';
import { Room } from '../types.ts';
import { Box } from '@mui/material';

interface RoomPreviewProps {
  room: Room;
}

const RoomPreview: React.FC<RoomPreviewProps> = ({ room }) => {
  const { width, height, door } = room;

  // Function to calculate the relative size of racks based on room size
  const calculateRackSize = (rackWidth: number, rackHeight: number) => ({
    width: (rackWidth / width) * 100,  // Convert to percentage
    height: (rackHeight / height) * 100 // Convert to percentage
  });

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
      {door && (
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
              top: `calc(50% - ${door.width / 2}px)`,
            }),
            ...(door.direction === 'right' && {
              right: 0,
              top: `calc(50% - ${door.width / 2}px)`,
            }),
            ...(door.direction === 'top' && {
              top: -30,
              left: door.position,
              transform: 'rotate(90deg)',
            }),
            ...(door.direction === 'bottom' && {
              bottom: -30,
              left: door.position,
              transform: 'rotate(270deg)',
            }),
          }}
        >
          {/* Door Handle */}
          <Box
            sx={{
              position: 'absolute',
              width: '6px',
              height: '10px',
              backgroundColor: 'goldenrod',
              borderRadius: '3px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
      )}

      {/* Render Racks */}
      {room.racks?.map((rack) => {
        const { width: rackWidth, height: rackHeight } = calculateRackSize(rack.width, rack.height);
        return (
          <Box
            key={rack.id}
            sx={{
              position: 'absolute',
              width: `${rackWidth}%`, // Set width as a percentage
              height: `${rackHeight}%`, // Set height as a percentage
              left: `${(rack.x / width) * 100}%`, // Position as a percentage of room width
              top: `${(rack.y / height) * 100}%`, // Position as a percentage of room height
              backgroundColor: rack.orientation === 'front' ? 'lightgreen' : 'lightcoral',
              borderRadius: '3px',
            }}
          />
        );
      })}
    </Box>
  );
};

export default RoomPreview;
