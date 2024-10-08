import React, { useEffect, useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { DoorProps, Room } from '../types';

interface RoomFormProps {
  room: Room | null;
  onAddRoom: (room: Room) => void;
  isEditMode: boolean;
  setEditingRoom: (room: null) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setDoor: (door: DoorProps) => void;
  door: DoorProps;
  width: number;
  height: number;
}

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;

const RoomForm: React.FC<RoomFormProps> = ({ room, onAddRoom, isEditMode, setEditingRoom, setWidth, setHeight, setDoor, door, width, height }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleDoorChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setDoor((prev: DoorProps) => ({
      ...prev,
      [name]: name === 'width' || name === 'position' ? Number(value) : value,
    }));
  };

  useEffect(() => {
    if (room) {
      setName(room.name);
      setAddress(room.address);
      setWidth(room.width);
      setHeight(room.height);
      setDoor(room.door);
    } else {
      setName('');
      setAddress('');
      setWidth(0);
      setHeight(0);
    }
  }, [room, setWidth, setHeight, setDoor]);

  const handleSubmit = () => {
    const newRoom: Room = {
      id: room ? room.id : Date.now(),
      name,
      address,
      width,
      height,
      racks: room?.racks ? room.racks : [],
      door, // Use the current door state
    };
    onAddRoom(newRoom);
  };

  return (
    <Box sx={{ width: '100%', margin: '20px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField size="small" label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField size="small" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />
        <TextField
          size="small"
          label="Room Width"
          type="number"
          value={width}
          onChange={(e) => setWidth(Math.max(0, Math.min(Number(e.target.value), MAX_WIDTH)))}
          fullWidth
        />
        <TextField
          size="small"
          label="Room Height"
          type="number"
          value={height}
          onChange={(e) => setHeight(Math.max(0, Math.min(Number(e.target.value), MAX_HEIGHT)))}
          fullWidth
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField size="small" label="Door Width" name="width" type="number" value={door.width} onChange={handleDoorChange} fullWidth />
        <TextField
          size="small"
          label="Direction"
          name="direction"
          select
          value={door.direction}
          onChange={handleDoorChange}
          fullWidth
          SelectProps={{ native: true }}
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </TextField>
        <TextField size="small" label="Position" name="position" type="number" value={door.position} onChange={handleDoorChange} fullWidth />
        
        <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
          <Button size="small" variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            {isEditMode ? 'Update' : 'Add'}
          </Button>
          <Button size="small" variant="outlined" color="secondary" onClick={() => setEditingRoom(null)} fullWidth>
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RoomForm;
