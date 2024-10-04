import React, { useEffect, useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { Room } from '../types';

interface RoomFormProps {
  room: Room | null; // Accept null for a new room
  onAddRoom: (room: Room) => void;
  isEditMode: boolean; // Flag to indicate edit mode
  setEditingRoom: (room: null) => void;
  setWidth: (width: number) => void; // New prop for setting width
  setHeight: (height: number) => void; // New prop for setting height
  width: number; // Current width
  height: number; // Current height
}

const MAX_WIDTH = 1000; // Set maximum width
const MAX_HEIGHT = 1000; // Set maximum height

const RoomForm: React.FC<RoomFormProps> = ({ room, onAddRoom, isEditMode, setEditingRoom, setWidth, setHeight, width, height }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // Effect to populate form fields when editing a room
  useEffect(() => {
    if (room) {
      setName(room.name);
      setAddress(room.address);
      setWidth(room.width);
      setHeight(room.height);
    } else {
      // Clear the form if room is null (for new room)
      setName('');
      setAddress('');
      setWidth(0);
      setHeight(0);
    }
  }, [room]);

  const handleSubmit = () => {
    const newRoom: Room = {
      id: room ? room.id : Date.now(),
      name,
      address,
      width,
      height,
      racks: room?.racks ? room.racks : [],
      door: {
        direction: 'top',
        width: 0,
        position: 0,
      }
    };
    onAddRoom(newRoom);
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        margin: '20px 0', 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
        gap: 2 
      }}
    >
      <TextField 
        size="small" 
        label="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        fullWidth 
      />
      <TextField 
        size="small" 
        label="Address" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        fullWidth 
      />
      <TextField 
        size="small" 
        label="Width" 
        type="number" 
        value={width} 
        onChange={(e) => {
          const value = Math.max(0, Math.min(Number(e.target.value), MAX_WIDTH)); // Limit the width
          setWidth(value);
        }} 
        fullWidth 
      />
      <TextField 
        size="small" 
        label="Height" 
        type="number" 
        value={height} 
        onChange={(e) => {
          const value = Math.max(0, Math.min(Number(e.target.value), MAX_HEIGHT)); // Limit the height
          setHeight(value);
        }} 
        fullWidth 
      />
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 1, 
          flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons vertically on small screens
          width: '100%', 
        }}
      >
        <Button 
          size="small" 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          fullWidth
        >
          {isEditMode ? 'Update' : 'Add'}
        </Button>
        <Button 
          size="small" 
          variant="outlined" 
          color="secondary" 
          onClick={() => setEditingRoom(null)} 
          fullWidth
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default RoomForm;
