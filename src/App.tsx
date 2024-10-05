import React, { useState } from 'react';
import RoomList from './components/RoomList';
import RoomForm from './components/RoomForm';
import { DoorProps, Room } from './types';
import { Button, Box } from '@mui/material';
import roomsData from './data/rooms.json';
import RoomEditor from './components/RoomEditor';

const App: React.FC = () => {
  const typedRoomsData: Room[] = roomsData;
  const [rooms, setRooms] = useState<Room[]>(typedRoomsData);
  const [door, setDoor] = useState<DoorProps>({
    direction: 'left',
    width: 50,
    position: 50,
  })
  const [editingRoom, setEditingRoom] = useState<Room | null>();
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [width, setWidth] = useState(0); // Track width here
  const [height, setHeight] = useState(0); // Track height here


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
    setWidth(room.width); // Set width when editing
    setHeight(room.height); // Set height when editing
    setIsAddingRoom(false); // Close adding room if it's open
    setDoor(room.door)
  };

  const handleBackToRoomList = () => {
    setIsAddingRoom(false);
    setEditingRoom(null); // Clear editing state
    setWidth(0); // Reset width
    setHeight(0); // Reset height
  };

  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
                setWidth(0); // Reset width
                setHeight(0); // Reset height
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
            <RoomForm
              room={editingRoom}
              onAddRoom={handleAddRoom}
              isEditMode={editingRoom !== null}
              setEditingRoom={handleBackToRoomList}
              setWidth={setWidth} // Pass setWidth function
              setHeight={setHeight} // Pass setHeight function
              setDoor={setDoor}
              door={door}
              width={width} // Pass current width
              height={height} // Pass current height
            />
            {<RoomEditor room={{ ...editingRoom, width, height,door }} />} {/* Pass updated dimensions */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default App;
