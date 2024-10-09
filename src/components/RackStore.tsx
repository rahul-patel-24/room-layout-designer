import React from 'react';
import { useDrag } from 'react-dnd';
import { Box } from '@mui/material';


interface RackStoreProps {
  width: number;
  height: number;
  id: string;
  frontSideDirection: string;
}

const RackStore: React.FC<RackStoreProps> = ({ width, height, id, frontSideDirection }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'RACK',
    item: { id, width, height, frontSideDirection },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={dragRef}
      width={width}
      height={height}
      bgcolor={isDragging ? 'lightgrey' : 'white'}
      borderTop="2px dotted red"
      borderBottom='5px solid green'
      borderLeft='1px dotted black'
      borderRight='1px dotted black'
      mt={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <span>{id}</span> &nbsp;
       {height} * {width}
    </Box>
  );
};

export default RackStore;
