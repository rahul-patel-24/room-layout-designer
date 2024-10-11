import React from 'react';
import { Box } from '@mui/material';
import Door from './Door';
import Rack from './Rack';
import { Room } from '../types';

interface RoomPreviewProps {
  room: Room;
  onRackRotate: (rackId: string) => void;
  onRackDelete: (rackId: string) => void;
  onRackDragEnd: (rackId: string, newX: number, newY: number) => void; // New prop for updating rack position
}

const RoomPreview: React.FC<RoomPreviewProps> = ({ room, onRackRotate, onRackDelete, onRackDragEnd }) => {
  const { width, height, door } = room;

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
      {/* Render door if exists */}
      {door && <Door width={door.width} direction={door.direction} position={door.position} />}

      {/* Render racks inside the room */}
      {room.racks?.map((rack) => (
        <Rack
          key={rack.id}
          width={rack.width}
          height={rack.height}
          x={(rack.x / width) * 100}
          y={(rack.y / height) * 100}
          frontSideDirection={rack.frontSideDirection}
          id={rack.id}
          roomWidth={width}
          roomHeight={height}
          onRotate={onRackRotate}
          onDelete={onRackDelete}
          onDragEnd={onRackDragEnd} // Pass the onDragEnd prop
        />
      ))}
    </Box>
  );
};

export default RoomPreview;
