import React from 'react';
import { Box } from '@mui/material';
import { DoorProps } from '../types.ts';

const Door: React.FC<DoorProps> = ({ width, direction, position }) => {
  const doorStyles = {
    position: 'absolute',
    backgroundColor: 'saddlebrown',
    borderRadius: '1px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    ...(direction === 'left' && {
      top: `${position}px`,
      left: 0,
      width: '10px',
      height: `${width + 20}px`,
    }),
    ...(direction === 'right' && {
      top: `${position}px`,
      right: 0,
      width: '10px',
      height: `${width + 20}px`,
    }),
    ...(direction === 'top' && {
      top: 0, // Positioned at the top wall
      left: `${position}px`,
      width: `${width + 20}px`, // Set the width horizontally for top
      height: '10px', // Small height since it's a horizontal door
      transform: 'none', // No need for rotation
    }),
    ...(direction === 'bottom' && {
      bottom: 0, // Positioned at the bottom wall
      left: `${position}px`,
      width: `${width + 20}px`, // Set the width horizontally for bottom
      height: '10px', // Small height since it's a horizontal door
      transform: 'none', // No need for rotation
    }),
  };

  return (
    <Box sx={doorStyles}>
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
  );
};

export default Door;
