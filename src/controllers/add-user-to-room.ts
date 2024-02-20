import { WebSocket } from 'ws';
import { Rooms_DB } from '../data-bases/rooms.db';
import { Players_DB } from '../data-bases/players.db';
import { RoomData, RoomUser } from '../models/room.model';

type RoomState = { room: RoomData; isReady: boolean };

export const addUserToRoom = (roomId: number, ws: WebSocket): RoomState => {
  const room = Rooms_DB.getRoomById(roomId)!;
  const playerToAdd = Players_DB.getPlayerByWs(ws)!;

  // if (!room || !playerToAdd) {
  //   return;
  // }

  const playerInRoom = room.roomUsers.find(
    (user) => user.index === playerToAdd.index,
  );

  if (playerInRoom) {
    return { room, isReady: false };
  }

  const user: RoomUser = { index: playerToAdd.index, name: playerToAdd.name };
  room.roomUsers.push(user);
  Rooms_DB.changeRoomStatus(room.roomId);

  return { room, isReady: true };
};
