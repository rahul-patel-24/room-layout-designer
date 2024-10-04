import React from 'react';
import { Room } from '../types.ts';
import { Box } from '@mui/material';
import Door from './Door';
import Rack from './Rack';

interface RoomPreviewProps {
  room: Room;
}

const RoomPreview: React.FC<RoomPreviewProps> = ({ room }) => {
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
      {/* Render the Door */}
      {door && <Door width={door.width} direction={door.direction} position={door.position} />}

      {/* Render Racks */}
      {room.racks?.map((rack) => (
        <Rack
          key={rack.id}
          width={rack.width}
          height={rack.height}
          x={(rack.x / width) * 100} // Convert to percentage
          y={(rack.y / height) * 100} // Convert to percentage
          frontSideDirection={rack.frontSideDirection}
          id={rack.id}
          roomWidth={width} // Pass room width
          roomHeight={height} // Pass room height
        />
      ))}
    </Box>
  );
};

export default RoomPreview;
