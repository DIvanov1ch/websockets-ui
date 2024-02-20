import { GameData } from './game.model';
import {
  LoginRequestData,
  LoginResponseData,
  WinnersResponseData,
} from './player.model';
import { RoomData, RoomUser } from './room.model';
import { ShipsResponseData, ShipsRequestData } from './ships.model';

export type HandshakeData =
  | LoginRequestData
  | LoginResponseData
  | WinnersResponseData
  | RoomData
  | RoomUser
  | RoomData[]
  | GameData
  | ShipsRequestData
  | ShipsResponseData;

export interface Handshake {
  type: string;
  data: string;
  id: number;
}
