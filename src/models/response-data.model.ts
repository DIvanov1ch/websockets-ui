import { HandshakeTypes } from '../enums/handshake-types';
import { AttackStatus } from './game.model';
import { Player } from './player.model';
import { Position, Ship } from './ships.model';

export interface RegParams {
  type: HandshakeTypes.REG;
  player: Player;
}

export interface UpdateRoomParams {
  type: HandshakeTypes.UPDATE_ROOM;
}

export interface UpdateWinnersParams {
  type: HandshakeTypes.UPDATE_WINNERS;
}

export interface CreateGameParams {
  type: HandshakeTypes.CREATE_GAME;
  playerId: number;
  gameId: number;
}

export interface StartGameParams {
  type: HandshakeTypes.START_GAME;
  playerId: number;
  ships: Ship[];
}

export interface TurnParams {
  type: HandshakeTypes.TURN;
  turn: number;
}

export interface AttackParams {
  type: HandshakeTypes.ATTACK;
  currentPlayer: number;
  position: Position;
  status: AttackStatus;
}

export interface WinnerParams {
  type: HandshakeTypes.FINISH;
  playerId: number;
}

export type Params =
  | RegParams
  | UpdateRoomParams
  | UpdateWinnersParams
  | CreateGameParams
  | StartGameParams
  | TurnParams
  | AttackParams
  | WinnerParams;
