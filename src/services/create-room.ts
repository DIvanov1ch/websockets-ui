import { Rooms_DB } from '../data-bases/rooms.db';
import { RoomData, RoomUser } from '../models/room.model';
import { generateIndex } from '../utils/generate-index';
import { WebSocket } from 'ws';
import { Players_DB } from '../data-bases/players.db';

export const createRoom = (ws: WebSocket) => {
  const player = Players_DB.getPlayerByWs(ws);

  if (!player) {
    return null;
  }

  const { index, name } = player;
  const existingRoom = Rooms_DB.getRoomWithUser(index);

  if (existingRoom) {
    return existingRoom;
  }

  const roomId = generateIndex('room');
  const roomUser: RoomUser = { index, name };
  const roomData: RoomData = { roomId, roomUsers: [roomUser] };
  Rooms_DB.addRoom(roomData);

  return roomData;
};
