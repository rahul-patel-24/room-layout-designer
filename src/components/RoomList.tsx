import React from 'react';
import { Room } from '../types';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid } from '@mui/material';

interface RoomListProps {
  rooms: Room[];
  onEditRoom: (room: Room) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onEditRoom }) => {
  return (
    <Box sx={{ width: '100%', margin: '20px 0' }}>
      {/* Table for larger screens */}
      <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' }, width: '100%' }}>
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

      {/* Stacked layout for smaller screens */}
      <Grid container spacing={2} sx={{ display: { xs: 'flex', md: 'none' }, marginTop: 2 }}>
        {rooms.map(room => (
          <Grid item xs={12} key={room.id}>
            <Paper sx={{ padding: 2, marginBottom: 1 }}>
              <Typography variant="h6">{room.name}</Typography>
              <Typography><strong>ID:</strong> {room.id}</Typography>
              <Typography><strong>Address:</strong> {room.address}</Typography>
              <Typography><strong>Width:</strong> {room.width}</Typography>
              <Typography><strong>Height:</strong> {room.height}</Typography>
              <Typography><strong>Racks:</strong> {room.racks.length}</Typography>
              <Button variant="text" onClick={() => onEditRoom(room)}>Edit</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoomList;
