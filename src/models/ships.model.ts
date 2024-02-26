export interface Position {
  x: number;
  y: number;
}

export type ShipType = 'small' | 'medium' | 'large' | 'huge';

export interface Ship {
  position: Position;
  direction: boolean;
  length: number;
  type: ShipType;
}

export interface ShipsRequestData {
  gameId: number;
  ships: Ship[];
  indexPlayer: number;
}

export interface ShipsResponseData {
  ships: Ship[];
  currentPlayerIndex: number;
}
