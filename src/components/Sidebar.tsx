import React from 'react';
import { useDrag } from 'react-dnd';
import { Card } from '@mui/material';
import { Rack as RackType } from '../types'; // Adjust the import based on your actual path

interface SidebarProps {
  racks: RackType[];
  setRacks: (racks: RackType[]) => void;
}

const predefinedRacks: RackType[] = [
  {
    id: 1, width: 100, height: 200,
    x: 0,
    y: 0,
    frontSideDirection: ''
  },
  {
    id: 2, width: 150, height: 250,
    x: 0,
    y: 0,
    frontSideDirection: ''
  },
  {
    id: 3, width: 120, height: 300,
    x: 0,
    y: 0,
    frontSideDirection: ''
  },
];

const Sidebar: React.FC<SidebarProps> = ({ racks, setRacks }) => {
  const handleDrop = (rack: RackType) => {
    setRacks([...racks, { ...rack, x: 0, y: 0, frontSideDirection: 'front' }]);
  };

  return (
    <div style={{ width: '200px', borderRight: '1px solid black', padding: '10px' }}>
      {predefinedRacks.map((rack) => (
        <RackComponent key={rack.id} rack={rack} onDrop={handleDrop} />
      ))}
    </div>
  );
};

interface RackProps {
  rack: RackType;
  onDrop: (rack: RackType) => void;
}

const RackComponent: React.FC<RackProps> = ({ rack, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'rack',
    item: rack,
    end: () => onDrop(rack),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {rack.width}x{rack.height}
    </Card>
  );
};

export default Sidebar;
