// Import necessary React hooks and components for managing state, side-effects, and UI layout.
import React, { useEffect, useState } from 'react'; 
import RoomList from './components/RoomList'; // Component to display the list of rooms
import RoomForm from './components/RoomForm'; // Form to add or edit room properties
import { DoorProps, Room } from './types'; // Type definitions for Room and Door objects
import { Button, Box } from '@mui/material'; // UI components from Material-UI
import roomsData from './data/rooms.json'; // Import static JSON data for rooms
import RoomEditor from './components/RoomEditor'; // Component for editing a room's layout
import { DndProvider } from 'react-dnd'; // Provider for enabling drag-and-drop functionality
import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend for browser-based DnD

const App: React.FC = () => {
  // State to manage the list of rooms
  const [rooms, setRooms] = useState<Room[]>([]);
  
  // State for door configuration, used across components to manage door-related properties
  const [door, setDoor] = useState<DoorProps>({
    direction: 'left',
    width: 50,
    position: 50,
  });

  // State to track which room is currently being edited
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // State to toggle the form for adding new rooms
  const [isAddingRoom, setIsAddingRoom] = useState(false);

  // States to store dimensions (width and height) of the selected or new room
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Load room data from localStorage or fallback to static JSON on initial render
  useEffect(() => {
    const savedRooms = localStorage.getItem('rooms');
    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
    } else {
      setRooms(roomsData);
      localStorage.setItem('rooms', JSON.stringify(roomsData)); // Save initial data in localStorage
    }
  }, []);

  // Helper function to update rooms in localStorage
  const updateLocalStorage = (updatedRooms: Room[]) => {
    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
  };

  // Handler to add or update a room, called by RoomForm or RoomEditor components
  const handleAddRoom = (room: Room) => {
    setRooms((prevRooms) => {
      const newRooms = editingRoom
        ? prevRooms.map((r) => (r.id === room.id ? room : r)) // Update if room exists
        : [...prevRooms, room]; // Add new room if it doesn't exist
      updateLocalStorage(newRooms); // Save updated list to localStorage
      return newRooms;
    });
  };

  // Handler to switch to edit mode for a specific room, setting all relevant states
  const handleEditRoom = (room: Room) => {
    setEditingRoom(room); // Track the room being edited
    setWidth(room.width); // Set the room's width and height for editing
    setHeight(room.height);
    setIsAddingRoom(false); // Disable add mode when editing
    setDoor(room.door); // Set the door configuration for the room
  };

  // Handler to reset the UI back to the room list view
  const handleBackToRoomList = () => {
    setIsAddingRoom(false);
    setEditingRoom(null);
    setWidth(0);
    setHeight(0);
  };

  return (
    <DndProvider backend={HTML5Backend}> {/* Enables drag-and-drop across components */}
      <Box
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {/* Display the room list and 'New Room' button if no room is being edited or added */}
          {!isAddingRoom && !editingRoom && (
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: '10px' }}
                onClick={() => {
                  setIsAddingRoom(true); // Enable the form to add a new room
                  setEditingRoom(null); // Clear any selected room for editing
                  setWidth(0); // Reset dimensions
                  setHeight(0);
                }}
              >
                New Room
              </Button>
              <RoomList rooms={rooms} onEditRoom={handleEditRoom} /> {/* List of rooms */}
            </Box>
          )}

          {/* Render the RoomForm and RoomEditor when adding or editing a room */}
          {(isAddingRoom || editingRoom) && (
            <Box width="100%" maxWidth="1200px" mx="auto">
              <RoomForm
                room={editingRoom ?? null} // Pass the selected room or null for new room
                onAddRoom={handleAddRoom} // Callback to handle adding or editing a room
                isEditMode={editingRoom !== null} // Boolean flag to indicate edit mode
                setEditingRoom={handleBackToRoomList} // Callback to exit edit mode
                setWidth={setWidth} // Setter for room width
                setHeight={setHeight} // Setter for room height
                setDoor={setDoor} // Setter for door configuration
                door={door} // Current door configuration
                width={width} // Current width of the room
                height={height} // Current height of the room
              />
              {editingRoom && (
                <RoomEditor
                  room={{ ...editingRoom, width, height, door }} // Pass the edited room's state
                  onRoomUpdate={handleAddRoom} // Callback to save updates made in the editor
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
