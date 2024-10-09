import React, { useEffect, useState } from 'react';
import RoomList from './components/RoomList';
import RoomForm from './components/RoomForm';
import { DoorProps, Room } from './types'; // Ensure Rack type is imported
import { Button, Box } from '@mui/material';
import roomsData from './data/rooms.json';
import RoomEditor from './components/RoomEditor';
import { DndProvider } from 'react-dnd'; // Import DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Import backend for drag and drop

const App: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [door, setDoor] = useState<DoorProps>({
    direction: 'left',
    width: 50,
    position: 50,
  });
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Load data from localStorage or JSON file on initial render
  useEffect(() => {
    const savedRooms = localStorage.getItem('rooms');
    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
    } else {
      setRooms(roomsData);
      localStorage.setItem('rooms', JSON.stringify(roomsData));
    }
  }, []);

  const updateLocalStorage = (updatedRooms: Room[]) => {
    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
  };

  const handleAddRoom = (room: Room) => {
    setRooms((prevRooms) => {
      const newRooms = editingRoom
        ? prevRooms.map((r) => (r.id === room.id ? room : r))
        : [...prevRooms, room];
      updateLocalStorage(newRooms); // Update local storage
      return newRooms;
    });
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setWidth(room.width);
    setHeight(room.height);
    setIsAddingRoom(false);
    setDoor(room.door);
  };

  const handleBackToRoomList = () => {
    setIsAddingRoom(false);
    setEditingRoom(null);
    setWidth(0);
    setHeight(0);
  };

  return (
    <DndProvider backend={HTML5Backend}> {/* Wrap your app in DndProvider */}
      <Box
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {!isAddingRoom && !editingRoom && (
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: '10px' }}
                onClick={() => {
                  setIsAddingRoom(true);
                  setEditingRoom(null);
                  setWidth(0);
                  setHeight(0);
                }}
              >
                New Room
              </Button>
              <RoomList rooms={rooms} onEditRoom={handleEditRoom} />
            </Box>
          )}

          {(isAddingRoom || editingRoom) && (
            <Box width="100%" maxWidth="1200px" mx="auto">
              <RoomForm
                room={editingRoom ?? null}
                onAddRoom={handleAddRoom}
                isEditMode={editingRoom !== null}
                setEditingRoom={handleBackToRoomList}
                setWidth={setWidth}
                setHeight={setHeight}
                setDoor={setDoor}
                door={door}
                width={width}
                height={height}
              />
              {editingRoom && (
                <RoomEditor
                  room={{ ...editingRoom, width, height, door }}
                  onRoomUpdate={handleAddRoom}
                />
              )}
            </Box>
          )}
        </Box>
      </Box>
    </DndProvider>
  );
};

export default App;
