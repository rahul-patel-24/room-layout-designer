import React from 'react';
import { Box } from '@mui/material';
import Door from './Door';
import Rack from './Rack';
import { Room } from '../types';

interface RoomPreviewProps {
  room: Room;
  onRackRotate: (rackId: string | number) => void;
  onRackDelete: (rackId: string | number) => void;
  // onRackDragEnd: (rackId: string | number, newX: number, newY: number) => void; // New prop for updating rack position
}

/**
 * RoomPreview Component
 * 
 * Displays a preview of the room layout, including racks and an optional door.
 * This component allows interaction with the racks, such as rotating or deleting them.
 * 
 * Params:
 * - room: The room object with its width, height, racks, and optional door.
 * - onRackRotate: Callback to rotate a rack in the room.
 * - onRackDelete: Callback to delete a rack from the room.
 * 
 * Parent:
 * - RoomEditor: Manages the room's state and uses RoomPreview to render its layout.
 * 
 * Child:
 * - Door: Renders the door of the room if it exists.
 * - Rack: Displays individual rack components with controls for rotation and deletion.
 */

const RoomPreview: React.FC<RoomPreviewProps> = ({ room, onRackRotate, onRackDelete
  // , onRackDragEnd
 }) => {
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
          // onDragEnd={onRackDragEnd} // Pass the onDragEnd prop
        />
      ))}
    </Box>
  );
};

export default RoomPreview;
