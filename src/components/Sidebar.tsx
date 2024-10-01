import React from 'react';
import { useDrag } from 'react-dnd';
import { Card } from '@mui/material';

interface Rack {
  id: number;
  width: number;
  height: number;
}

interface SidebarProps {
  racks: Rack[];
  setRacks: (racks: Rack[]) => void;
}

const predefinedRacks: Rack[] = [
  { id: 1, width: 100, height: 200 },
  { id: 2, width: 150, height: 250 },
  { id: 3, width: 120, height: 300 },
];

const Sidebar: React.FC<SidebarProps> = ({ racks, setRacks }) => {
  const handleDrop = (rack: Rack) => {
    setRacks([...racks, { ...rack, x: 0, y: 0, orientation: 'front' }]);
  };

  return (
    <div style={{ width: '200px', borderRight: '1px solid black', padding: '10px' }}>
      {predefinedRacks.map((rack) => (
        <Rack key={rack.id} rack={rack} onDrop={handleDrop} />
      ))}
    </div>
  );
};

interface RackProps {
  rack: Rack;
  onDrop: (rack: Rack) => void;
}

const Rack: React.FC<RackProps> = ({ rack, onDrop }) => {
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
