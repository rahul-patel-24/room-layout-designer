import React from 'react';
import { Box } from '@mui/material';
import { Rack as RackProps } from '../types.ts';

const Rack: React.FC<RackProps> = ({ width = 100, height = 50 }) => {
  return (
    <Box
      width={width}
      height={height}
      borderTop="2px dotted red"
      borderBottom='5px solid green'
      borderLeft='1px dotted black'
      borderRight='1px dotted black'
      mt={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Rack {height} * {width}
    </Box>
  );
};

export default Rack;
