import React from 'react';
import { useDrag } from 'react-dnd';
import { Box } from '@mui/material';
import {Rack as RackStoreProps} from '../types'

/**
 * RackStore Component
 *
 * This component represents a draggable rack, which can be used in a room layout. 
 * It leverages the **react-dnd** library to make the rack draggable.
 *
 * Purpose:
 * - Used to visually represent a rack with specific dimensions.
 * - Allows dragging to other components (like a room).
 * 
 * Parent:
 * RoomEditor
 *
 * Props:
 * - `width`: Width of the rack.
 * - `height`: Height of the rack.
 * - `id`: Unique identifier of the rack.
 * - `frontSideDirection`: Direction of the front side of the rack.
 *
 * Features:
 * - Applies border styles based on rack orientation.
 * - Changes background color when the rack is being dragged.
 *
 * Dependencies:
 * - Uses `react-dnd` for drag-and-drop functionality.
 * - `@mui/material` for layout and styling.
 */

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
