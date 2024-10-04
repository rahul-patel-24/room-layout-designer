// Door.tsx
import React from 'react';
import { Box } from '@mui/material';
import { DoorProps } from '../types.ts';

const Door: React.FC<DoorProps> = ({ width, direction, position }) => {
  const doorStyles = {
    position: 'absolute',
    backgroundColor: 'saddlebrown',
    height: width + 20,
    width: '10px',
    borderRadius: '1px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    ...(direction === 'left' && {
      left: 0,
      top: `calc(50% - ${width / 2}px)`,
    }),
    ...(direction === 'right' && {
      right: 0,
      top: `calc(50% - ${width / 2}px)`,
    }),
    ...(direction === 'top' && {
      top: -30,
      left: position,
      transform: 'rotate(90deg)',
    }),
    ...(direction === 'bottom' && {
      bottom: -30,
      left: position,
      transform: 'rotate(270deg)',
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
