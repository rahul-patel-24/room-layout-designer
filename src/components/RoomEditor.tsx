import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import RoomPreview from './RoomPreview';
import { Room } from '../types.ts';
import RackStore from './RackStore.tsx';

interface RoomEditorProps {
  room: Room;
  onRoomUpdate: (updatedRoom: Room) => void;
}

const RoomEditor: React.FC<RoomEditorProps> = ({ room, onRoomUpdate }) => {
  const [updatedRoom, setUpdatedRoom] = useState(room);

  const handleRackRotate = (rackId: string) => {
    setUpdatedRoom((prevRoom) => {
      const updatedRacks = prevRoom.racks.map((rack) => {
        if (rack.id === rackId) {
          const nextDirection = getNextDirection(rack.frontSideDirection);
          const { width, height } = getDimensionsByDirection(rack.width, rack.height);

          return {
            ...rack,
            width,
            height,
            frontSideDirection: nextDirection,
          };
        }
        return rack;
      });

      // Update the room state with the new racks
      const newRoom = { ...prevRoom, racks: updatedRacks };
      onRoomUpdate(newRoom); // Call the update function to propagate changes
      return newRoom;
    });
  };

  const handleRackDelete = (rackId: string) => {
    setUpdatedRoom((prevRoom) => {
      const updatedRacks = prevRoom.racks.filter((rack) => rack.id !== rackId);

      const newRoom = { ...prevRoom, racks: updatedRacks };
      onRoomUpdate(newRoom); // Call the update function to propagate changes
      return newRoom;
    });
  };

  const getDimensionsByDirection = (originalWidth: number, originalHeight: number) => {
    return { width: originalHeight, height: originalWidth };
  };

  const getNextDirection = (currentDirection: string) => {
    const directions = ['north', 'east', 'south', 'west'];
    const currentIndex = directions.indexOf(currentDirection);
    return directions[(currentIndex + 1) % directions.length];
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Box display="flex" justifyContent="center" flexDirection={{ xs: 'column', md: 'row' }} gap={10} width="100%">
        <Box width={{ xs: '100%', md: '20%' }} display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Instructions
          </Typography>
          <Box>
            <ul style={{ paddingLeft: '15px' }}>
              <li>
                <span style={{ color: 'green', fontWeight: 'bold' }}>Green</span> represents the front side of the rack.
              </li>
              <li>
                <span style={{ color: 'red', fontWeight: 'bold' }}>Red</span> represents the back side of the rack.
              </li>
              <li>Drag these racks into the room to place them as needed.</li>
            </ul>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <RackStore width={120} height={75} id="rack1" x={0} y={0} frontSideDirection="north" />
            <RackStore width={120} height={100} id="rack2" x={0} y={0} frontSideDirection="north" />
            <RackStore id="rack3" width={150} height={120} x={0} y={0} frontSideDirection="north" />
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center" width={{ xs: '100%', md: '80%' }} position="relative">
          <RoomPreview room={updatedRoom} onRackRotate={handleRackRotate} onRackDelete={handleRackDelete} />
        </Box>
      </Box>
    </Paper>
  );
};

export default RoomEditor;
