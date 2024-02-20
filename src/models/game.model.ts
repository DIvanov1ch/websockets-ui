import { Position, Ship } from './ships.model';


export interface Game {
  idGame: number;
  firstPlayerId: number;
  secondPlayerId: number;
  ships: Map<number, Ship[]>;
  turn: number | null;
}

export interface GameData {
  idGame: number;
  idPlayer: number;
}

export interface AttackResponse {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
}

type AttackStatus = 'miss' | 'killed' | 'shot';

export interface AttackResponse {
  position: Position;
  currentPlayer: number;
  status: AttackStatus;
}

export interface RandomAttack {
  gameId: number;
  indexPlayer: number;
}

export interface Turn {
  currentPlayer: number | null;
}

export interface Winner {
  winPlayer: number;
}
