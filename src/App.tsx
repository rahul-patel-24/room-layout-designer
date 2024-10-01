import React, { useState } from 'react';
import RoomList from './components/RoomList';
import RoomForm from './components/RoomForm';
import { Room } from './types';
import { Button, Box } from '@mui/material';
import roomsData from './data/rooms.json';
import RoomEditor from './components/RoomEditor';

const App: React.FC = () => {
  const typedRoomsData: Room[] = roomsData;
  const [rooms, setRooms] = useState<Room[]>(typedRoomsData);
  const [editingRoom, setEditingRoom] = useState<Room | null | []>(null);
  const [isAddingRoom, setIsAddingRoom] = useState(false);

  const handleAddRoom = (room: Room) => {
    setRooms((prevRooms) => {
      if (editingRoom) {
        // Update existing room
        return prevRooms.map((r) => (r.id === room.id ? room : r));
      } else {
        // Add new room
        return [...prevRooms, room];
      }
    });
    setIsAddingRoom(false);
    setEditingRoom(null); // Clear editing state
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setIsAddingRoom(false); // Close adding room if it's open
  };

  const handleBackToRoomList = () => {
    setIsAddingRoom(false);
    setEditingRoom(null); // Clear editing state
  };

  return (
    <Box
      sx={{
       
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {/* Show RoomList only when not adding or editing a room */}
        {!isAddingRoom && !editingRoom && (
          <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginBottom: '10px' }}
              onClick={() => {
                setIsAddingRoom(true);
                setEditingRoom(null); // Ensure editing is cleared
              }}
            >
              New Room
            </Button>
            <RoomList rooms={rooms} onEditRoom={handleEditRoom} />
          </Box>
        )}

        {/* Show RoomForm and RoomEditor when adding or editing a room */}
        {(isAddingRoom || editingRoom) && (
          <Box width="100%" maxWidth="1200px" mx="auto">
            <RoomForm room={editingRoom} onAddRoom={handleAddRoom} isEditMode={editingRoom !== null} setEditingRoom={handleBackToRoomList} />
            <RoomEditor room={editingRoom || []} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default App;
