import { Rooms_DB } from '../data-bases/rooms.db';
import { RoomData, RoomUser } from '../models/room.model';
import { generateIndex } from '../utils/generate-index';
import { WebSocket } from 'ws';
import { Players_DB } from '../data-bases/players.db';

export const createRoom = (ws: WebSocket) => {
  const player = Players_DB.getPlayerByWs(ws)!;
  const user: RoomUser = { index: player.index, name: player.name };
  const existingRoom = Rooms_DB.getRoomWithUser(user);

  if (existingRoom) {
    return existingRoom;
  }

  const roomId = generateIndex('room');
  const roomData: RoomData = { roomId, roomUsers: [user] };
  Rooms_DB.addRoom(roomData);

  return roomData;
};
