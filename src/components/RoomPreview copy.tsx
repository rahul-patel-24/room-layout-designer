import React from 'react';
import { Room } from '../types.ts';
import { Box } from '@mui/material';

interface RoomPreviewProps {
  room: Room;
}

const RoomPreview: React.FC<RoomPreviewProps> = ({ room }) => {
  const { width, height, door } = room;

  return (
    <Box
      sx={{
        maxWidth: '100%', // Prevent overflow
        maxHeight: '80vh', // Prevent height from exceeding the viewport height
        width: { xs: '100%', sm: width }, // Full width on extra small screens
        height: { xs: 'auto', sm: height }, // Auto height on small screens
        aspectRatio: width / height, // Maintain aspect ratio
        border: '2px solid black',
        position: 'relative',
        padding: { xs: '10px', sm: '0' }, // Add padding for small screens
        boxSizing: 'border-box', // Include padding and border in the element's total width and height
        overflow: 'hidden', // Hide overflow to prevent content spilling out
      }}
    >
      {/* Render the Door as a Swinging Door in Architectural Style */}
      {door && (
        <>
          {/* Door Panel (static) */}
          <Box
            sx={{
              position: 'absolute',
              backgroundColor: 'saddlebrown', // Door color
              height: door.width, // Height of the door
              width: '20px', // Width of the door
              borderRadius: '2px', // Slight rounding for the door edges
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Shadow for depth
              ...(door.direction === 'left' && {
                left: 0,
                top: (height - door.width) / 2, // Center vertically for left door
                transform: 'rotate(0deg)', // Rotate for door opening inward
              }),
              ...(door.direction === 'right' && {
                right: 0,
                top: (height - door.width) / 2, // Center vertically for right door
                transform: 'rotate(180deg)', // Rotate for right door
              }),
              ...(door.direction === 'top' && {
                top: 0,
                left: door.position, // Position from the left
                transform: 'rotate(90deg)', // Rotate for top door swing
              }),
              ...(door.direction === 'bottom' && {
                bottom: 0,
                left: door.position, // Position from the left
                transform: 'rotate(270deg)', // Rotate for bottom door swing
              }),
            }}
          />

          {/* Door Swing Arc (Small Arc indicating door swing) */}
          <Box
            sx={{
              position: 'absolute',
              width: '50px', // Adjust arc radius
              height: '50px',
              borderBottom: '2px dashed gray', // Dashed arc to represent swing
              borderRight: '2px dashed gray', // Completing the quarter-circle arc
              borderRadius: '50%', // Make it circular
              ...(door.direction === 'left' && {
                left: 20, // Position arc next to the door panel
                top: (height - 50) / 2, // Center the arc vertically for left door
              }),
              ...(door.direction === 'right' && {
                right: 20, // Position arc next to the right door
                top: (height - 50) / 2, // Center the arc vertically for right door
                transform: 'rotate(90deg)', // Rotate for right swing
              }),
              ...(door.direction === 'top' && {
                top: 20, // Move the arc below the top door
                left: door.position + 20, // Position the arc from the left
                transform: 'rotate(180deg)', // Rotate for top door swing
              }),
              ...(door.direction === 'bottom' && {
                bottom: 20, // Move the arc above the bottom door
                left: door.position + 20, // Position the arc from the left
                transform: 'rotate(270deg)', // Rotate for bottom door swing
              }),
            }}
          />
        </>
      )}

      {/* Render Racks */}
      {room.racks.map((rack) => (
        <Box
          key={rack.id}
          sx={{
            position: 'absolute',
            width: rack.width,
            height: rack.height,
            left: rack.x,
            top: rack.y,
            backgroundColor: rack.orientation === 'front' ? 'lightgreen' : 'lightcoral', // Color based on orientation
            borderRadius: '3px', // Rounded edges for racks
          }}
        />
      ))}
    </Box>
  );
};

export default RoomPreview;
