import React from 'react';
import { Room } from '../types.ts';
import { Box } from '@mui/material';

interface RoomPreviewProps {
  room: Room;
}

const RoomPreview: React.FC<RoomPreviewProps> = ({ room }) => {
  const { width, height, door } = room;

  // Function to calculate the relative size of racks based on room size
  const calculateRackSize = (rackWidth: number, rackHeight: number) => ({
    width: (rackWidth / width) * 100,  // Convert to percentage
    height: (rackHeight / height) * 100 // Convert to percentage
  });

  // Function to get border styles based on frontSideDirection
  const getBorderStyles = (direction: string) => {
    // Default border for left and right
    const baseBorder = '1px dotted black'; 
    // Initialize border styles
    let topBorder = baseBorder;
    let bottomBorder = baseBorder;
    let leftBorder = baseBorder;
    let rightBorder = baseBorder;
  
    // Set borders based on frontSideDirection
    switch (direction) {
      case 'north':
        topBorder = '5px solid green'; // Front
        bottomBorder = '2px dotted red'; // Back
        break;
      case 'south':
        topBorder = '2px dotted red'; // Back
        bottomBorder = '5px solid green'; // Front
        break;
      case 'east':
        leftBorder = '2px dotted red'; // Back
        rightBorder = '5px solid green'; // Front
        break;
      case 'west':
        leftBorder = '5px solid green'; // Front
        rightBorder = '2px dotted red'; // Back
        break;
    }
  
    return {
      borderTop: topBorder,
      borderBottom: bottomBorder,
      borderLeft: leftBorder,
      borderRight: rightBorder,
    };
  };
  

  return (
    <Box
      sx={{
        maxWidth: '100%',
        maxHeight: '80vh',
        width: '100%',
        height: 'auto',
        aspectRatio: `${width} / ${height}`,
        border: '2px solid black',
        position: 'relative',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Render the Door */}
      {door && (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'saddlebrown',
            height: door.width + 20,
            width: '10px',
            borderRadius: '1px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            ...(door.direction === 'left' && {
              left: 0,
              top: `calc(50% - ${door.width / 2}px)`,
            }),
            ...(door.direction === 'right' && {
              right: 0,
              top: `calc(50% - ${door.width / 2}px)`,
            }),
            ...(door.direction === 'top' && {
              top: -30,
              left: door.position,
              transform: 'rotate(90deg)',
            }),
            ...(door.direction === 'bottom' && {
              bottom: -30,
              left: door.position,
              transform: 'rotate(270deg)',
            }),
          }}
        >
          {/* Door Handle */}
          <Box
            sx={{
              position: 'absolute',
              width: '6px',
              height: '10px',
              backgroundColor: 'goldenrod',
              borderRadius: '3px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
      )}

      {/* Render Racks */}
      {room.racks?.map((rack) => {
        const { width: rackWidth, height: rackHeight } = calculateRackSize(rack.width, rack.height);
        
        // Get border styles based on frontSideDirection
        const borderStyles = getBorderStyles(rack.frontSideDirection);

        return (
          <Box
            key={rack.id}
            sx={{
              position: 'absolute',
              width: `${rackWidth}%`, // Set width as a percentage
              height: `${rackHeight}%`, // Set height as a percentage
              left: `${(rack.x / width) * 100}%`, // Position as a percentage of room width
              top: `${(rack.y / height) * 100}%`, // Position as a percentage of room height
              backgroundColor: 'white', // Neutral background color
              ...borderStyles, // Apply dynamic border styles
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Rack {rack.height} * {rack.width}
          </Box>
        );
      })}
    </Box>
  );
};

export default RoomPreview;
