import React from 'react';
import { Box } from '@mui/material';
import Door from './Door';
import Rack from './Rack';
import { Room } from '../types.ts';

interface RoomPreviewProps {
  room: Room;
  onRackRotate: (rackId: string) => void;
  onRackDelete: (rackId: string) => void;
}

const RoomPreview: React.FC<RoomPreviewProps> = ({ room, onRackRotate, onRackDelete }) => {
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
      {door && <Door width={door.width} direction={door.direction} position={door.position} />}

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
        />
      ))}
    </Box>
  );
};

export default RoomPreview;
