import { AttackResponse, GameData, Turn, Winner } from './game.model';
import {
  LoginRequestData,
  LoginResponseData,
  WinnersResponseData,
} from './player.model';
import { RoomData, RoomUser } from './room.model';
import { ShipsResponseData, ShipsRequestData, Position } from './ships.model';

export type ParsedData = object | [] | string | number | boolean | null;

export type HandshakeData =
  | LoginRequestData
  | LoginResponseData
  | WinnersResponseData
  | RoomData
  | RoomUser
  | RoomData[]
  | GameData
  | ShipsRequestData
  | ShipsResponseData
  | Turn
  | Position
  | Position[]
  | Winner
  | AttackResponse;

export interface Handshake {
  type: string;
  data: string;
  id: number;
}

export type HandshakeType = 'response' | 'request' | 'result';
