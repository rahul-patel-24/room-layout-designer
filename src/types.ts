export interface Door {
  direction: 'left' | 'right' | 'top' | 'bottom';
  width: number;
  position: number;
}

export interface Room {
  id: number;
  width: number;
  height: number;
  door: Door; // Change this line to use the Door interface
  name: string;
  address: string;
  racks: Rack[];
}

export interface Rack {
  id: number | string;
  width: number;
  height: number;
  x: number;
  y: number;
  orientation: string;
}
