import { RoomUser } from './room.model';
import { Position, Ship, ShipType } from './ships.model';

export type ShipOnBoard = {
  head: Position;
  type: ShipType;
  positions: Position[];
  length: number;
  shots: number;
  direction: boolean;
};

export interface Game {
  idGame: number;
  playerIds: number[];
  shipsMap: Map<number, Ship[]>;
  turn: number | null;
  boards: Map<number, ShipOnBoard[]>;
  score: { [key: string]: number };
  shots: Map<number, Set<string>>;
  singlePlay: boolean;
}

export interface GameData {
  idGame: number;
  idPlayer: number;
}

export interface AttackRequest {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
}

export type AttackStatus = 'miss' | 'killed' | 'shot';

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

export type GameState = { game: Game | undefined; isReady: boolean };

export interface SinglePlayerParams {
  singlePlay: true;
  playerId: number;
}

export interface MultiplayersParams {
  singlePlay: false;
  roomUsers: RoomUser[];
}

export type GameParams = SinglePlayerParams | MultiplayersParams;
