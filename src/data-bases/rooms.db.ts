import { RoomData, RoomUser } from '../models/room.model';
import { stringify } from '../utils/stringify';

export const Rooms_DB = (() => {
  const rooms: RoomData[] = [];
  const roomsInGame: RoomData[] = [];

  return {
    getAllRooms: () => rooms,

    addRoom: (room: RoomData) => rooms.push(room),

    getRoomWithUser: (user: RoomUser): RoomData | undefined =>
      rooms.find((room) =>
        room.roomUsers.find((u) => stringify(u) === stringify(user)),
      ),

    getRoomById: (id: number) => rooms.find((room) => (room.roomId = id)),

    changeRoomStatus: (id: number) => {
      const index = rooms.findIndex((room) => room.roomId = id);
      const roomToMove = rooms.splice(index, 1).pop()!;
      roomsInGame.push(roomToMove);
    },
  };
})();
