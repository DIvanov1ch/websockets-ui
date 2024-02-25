import { WebSocket } from 'ws';
import { Rooms_DB } from '../data-bases/rooms.db';
import { Players_DB } from '../data-bases/players.db';
import { RoomState, RoomUser } from '../models/room.model';
import { REQUIRED_NUMBER_OF_PLAYERS } from '../constants';

export const addUserToRoom = (roomId: number, ws: WebSocket): RoomState => {
  const playerToAdd = Players_DB.getPlayerByWs(ws);
  const roomUsers = Rooms_DB.getUsersInRoom(roomId);

  if (!playerToAdd) {
    return { roomUsers, isReady: false };
  }

  const { index, name } = playerToAdd;
  const playerInRoom = roomUsers.find((user) => user.index === index);

  if (playerInRoom) {
    return { roomUsers, isReady: false };
  }

  const user: RoomUser = { index, name };
  Rooms_DB.addUserToRoom(roomId, user);

  if (roomUsers.length !== REQUIRED_NUMBER_OF_PLAYERS) {
    return { roomUsers, isReady: false };
  }
  Rooms_DB.removeRoom(roomId);

  return { roomUsers, isReady: true };
};
