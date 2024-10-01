import React from 'react';
import { Room } from '../types';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

interface RoomListProps {
  rooms: Room[];
  onEditRoom: (room: Room) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onEditRoom }) => {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto', margin: '20px 0' }}>
      <TableContainer component={Paper} sx={{ maxWidth: '800px', width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Width</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Racks</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(room => (
              <TableRow key={room.id}>
                <TableCell>{room.id}</TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.address}</TableCell>
                <TableCell>{room.width}</TableCell>
                <TableCell>{room.height}</TableCell>
                <TableCell>{room.racks.length}</TableCell>
                <TableCell>
                  <Button variant="text" onClick={() => onEditRoom(room)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RoomList;
