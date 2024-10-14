import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { Rack as RackType } from '../types';
import { faSyncAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrag, useDrop } from 'react-dnd';

interface RackProps extends RackType {
  roomWidth: number;
  roomHeight: number;
  onRotate: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  // onDragEnd: (id: string | number, newX: number, newY: number) => void;
}

// Forward ref to allow parent components to access the Rack ref if needed
const Rack = forwardRef<unknown, RackProps>(
  (
    {
      width,
      height,
      x,
      y,
      frontSideDirection,
      id,
      roomWidth,
      roomHeight,
      onRotate,
      onDelete,
      // onDragEnd,
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    const [{ isDragging }, dragRef] = useDrag({
      type: 'RACK',
      item: { id, width, height, frontSideDirection, x, y },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, dropRef] = useDrop({
      accept: 'RACK',
      drop: (_item: RackType, monitor) => {
        const dropArea = monitor.getClientOffset();
        if (!dropArea) return;

        // const newX = (dropArea.x / roomWidth) * 100 - width / 2;
        // const newY = (dropArea.y / roomHeight) * 100 - height / 2;

        // onDragEnd(id, newX, newY);
      },
    });

    // Merge refs for drag and drop
    dragRef(elementRef);
    dropRef(elementRef);

    // Expose the elementRef to the parent component via useImperativeHandle
    useImperativeHandle(ref, () => elementRef.current);

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
        ref={elementRef}
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
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          '&:hover': { transform: 'scale(1.05)' },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Rack {height} * {width}

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
  }
);

export default Rack;
