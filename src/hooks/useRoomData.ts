import { useState } from 'react';
import roomData from '../data/rooms.json';

interface Rack {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  orientation: 'front' | 'back';
}

interface Room {
  id: number;
  name: string;
  width: number;
  height: number;
  racks: Rack[];
  door?: 'left' | 'right' | 'top' | 'bottom';
}

export const useRoomData = () => {
  const [rooms, setRooms] = useState<Room[]>(roomData);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  const saveRoom = (updatedRoom: Room) => {
    const updatedRooms = rooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room));
    setRooms(updatedRooms);
    setCurrentRoom(null); // Close edit mode
  };

  return {
    rooms,
    currentRoom,
    setCurrentRoom,
    saveRoom,
  };
};
