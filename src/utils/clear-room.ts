import { WebSocket } from 'ws';
import { Rooms_DB } from '../data-bases/rooms.db';

export const clearRoom = (ws: WebSocket, playerId: number) => {
  const room = Rooms_DB.getRoomWithUser(playerId);
  if (room) {
    Rooms_DB.removeUserFromRoom(room.roomId, playerId);
    ws.emit('updaterooms');
  }
};
