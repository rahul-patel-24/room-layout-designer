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
      <Box display="flex" justifyContent='center' flexDirection={{ xs: 'column', md: 'row' }} gap={10} width="100%">
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

        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={{ xs: '100%', md: '80%' }}>
          <RoomPreview room={room} />
        </Box>
      </Box>
    </Paper>
  );
};

export default RoomEditor;
