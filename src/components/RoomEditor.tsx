import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import RoomPreview from './RoomPreview';
import Rack from './Rack';
import { Room } from '../types.ts';

interface RoomEditorProps {
  room: Room | null | [];
}

const RoomEditor: React.FC<RoomEditorProps> = ({ room }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Box display="flex" justifyContent="center" flexDirection={{ xs: 'column', md: 'row' }} gap={10} width="100%">
        
        {/* Sidebar with Instructions and Racks */}
        <Box width={{ xs: '100%', md: '20%' }} display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Instructions
          </Typography>
          <Box>
            <ul style={{ paddingLeft: '15px' }}>
              <li>
                <span style={{ color: 'green', fontWeight: 'bold' }}>Green</span> represents the front side of the rack.
              </li>
              <li>
                <span style={{ color: 'red', fontWeight: 'bold' }}>Red</span> represents the back side of the rack.
              </li>
              <li>Drag these racks into the room to place them as needed.</li>
            </ul>
          </Box>

          {/* Rack Elements */}
          <Box display="flex" flexDirection="column" gap={2}>
            <Rack width={120} height={75} /> {/* Front side */}
            <Rack width={120} height={100} /> {/* Back side */}
            <Rack /> {/* Uses default values, can be either front or back */}
          </Box>
        </Box>

        {/* Room Preview */}
        <Box display="flex" justifyContent="center" alignItems="center" width={{ xs: '100%', md: '80%' }} position="relative">
          {/* Room Preview */}
          <RoomPreview room={room} />
        </Box>

         {/* Direction Symbols (Top-Right Corner) */}
         <Box
            sx={{
              position: 'absolute',
              top: 150,
              right: 150,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',
              padding: '10px',
              backgroundColor: 'aliceblue',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>N</Typography>
            <Box display="flex" gap="10px">
              <Typography sx={{ fontWeight: 'bold' }}>W</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>E</Typography>
            </Box>
            <Typography sx={{ fontWeight: 'bold' }}>S</Typography>
          </Box>
      </Box>
    </Paper>
  );
};

export default RoomEditor;
