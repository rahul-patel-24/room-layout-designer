import React, { useState, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import RoomPreview from './RoomPreview';
import RackStore from './RackStore';
import { useDrop } from 'react-dnd';
import { Room } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface RoomEditorProps {
  room: Room;
  onRoomUpdate: (updatedRoom: Room) => void;
}

const RoomEditor: React.FC<RoomEditorProps> = ({ room, onRoomUpdate }) => {
  const [updatedRoom, setUpdatedRoom] = useState(room);
  const roomRef = useRef<HTMLDivElement>(null);

  // Drop target for racks dragged into the room
  const [{ isOver }, dropRef] = useDrop({
    accept: 'RACK',
    drop: (item: any, monitor) => {
      const dropArea = roomRef.current?.getBoundingClientRect();
      const offset = monitor.getClientOffset();
      if (!dropArea || !offset) return;

      const existingRack = updatedRoom.racks.find(rack => rack.id === item.id);
      if (existingRack) {
        // Update position of existing rack
        const x = ((offset.x - dropArea.left) / dropArea.width) * updatedRoom.width;
        const y = ((offset.y - dropArea.top) / dropArea.height) * updatedRoom.height;

        const updatedRacks = updatedRoom.racks.map(rack => 
          rack.id === item.id ? { ...rack, x, y } : rack
        );

        const newRoom = { ...updatedRoom, racks: updatedRacks };
        setUpdatedRoom(newRoom);
        onRoomUpdate(newRoom);
      } else {
        // Add new rack to the room
        const x = ((offset.x - dropArea.left) / dropArea.width) * updatedRoom.width;
        const y = ((offset.y - dropArea.top) / dropArea.height) * updatedRoom.height;

        const newRack = {
          ...item, // data from the dragged rack
          id: uuidv4(), // Generate a unique ID for each new rack
          frontSideDirection: 'north', // Set default direction
          x,
          y,
        };

        // Update room with the new rack
        const updatedRacks = [...updatedRoom.racks, newRack];
        const newRoom = { ...updatedRoom, racks: updatedRacks };
        setUpdatedRoom(newRoom);
        onRoomUpdate(newRoom); // Save changes to room
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleRackRotate = (rackId: string) => {
    setUpdatedRoom((prevRoom) => {
      const updatedRacks = prevRoom.racks.map((rack) => {
        if (rack.id === rackId) {
          const nextDirection = getNextDirection(rack.frontSideDirection);
          const { width, height } = getDimensionsByDirection(rack.width, rack.height);
          return { ...rack, width, height, frontSideDirection: nextDirection };
        }
        return rack;
      });
      const newRoom = { ...prevRoom, racks: updatedRacks };
      onRoomUpdate(newRoom); // Update the room state
      return newRoom;
    });
  };

  const handleRackDelete = (rackId: string) => {
    setUpdatedRoom((prevRoom) => {
      const updatedRacks = prevRoom.racks.filter((rack) => rack.id !== rackId);
      const newRoom = { ...prevRoom, racks: updatedRacks };
      onRoomUpdate(newRoom);
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
              <li><span style={{ color: 'green', fontWeight: 'bold' }}>Green</span> represents the front side of the rack.</li>
              <li><span style={{ color: 'red', fontWeight: 'bold' }}>Red</span> represents the back side of the rack.</li>
              <li>Drag these racks into the room to place them.</li>
            </ul>
          </Box>

          {/* RackStore to drag racks from */}
          <Box display="flex" flexDirection="column" gap={2}>
            <RackStore width={120} height={75} id="rack1" x={0} y={0} frontSideDirection="north" />
            <RackStore width={120} height={100} id="rack2" x={0} y={0} frontSideDirection="north" />
            <RackStore id="rack3" width={150} height={120} x={0} y={0} frontSideDirection="north" />
          </Box>
        </Box>

        {/* Drop area */}
        <Box
          ref={(node) => {
            dropRef(node);
            roomRef.current = node;
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={{ xs: '100%', md: '80%' }}
        >
          <RoomPreview room={{ ...updatedRoom, door: room?.door }} onRackRotate={handleRackRotate} onRackDelete={handleRackDelete} />
        </Box>
      </Box>
    </Paper>
  );
};

export default RoomEditor;
