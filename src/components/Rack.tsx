import React from 'react';
import { Box } from '@mui/material';

interface RackProps {
  width?: number;
  height?: number;
}

const Rack: React.FC<RackProps> = ({ width = 100, height = 50 }) => {
  return (
    <Box
      width={width}
      height={height}
      borderTop="2px solid red"
      borderBottom='5px solid green'
      borderLeft='1px solid black'
      borderRight='1px solid black'
      mt={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Rack {width} * {height}
    </Box>
  );
};

export default Rack;
