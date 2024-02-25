import { RoomData, RoomUser } from '../models/room.model';

export const Rooms_DB = (() => {
  const rooms = new Map<number, RoomData>();

  return {
    getAllRooms: () => [...rooms.values()],

    getRoomById: (roomId: number) => rooms.get(roomId),

    addUserToRoom: (roomId: number, user: RoomUser) => {
      rooms.get(roomId)?.roomUsers.push(user);
    },

    removeUserFromRoom: (roomId: number, userId: number) => {
      const room = rooms.get(roomId);
      const index = room?.roomUsers.findIndex((user) => user.index === userId);
      if (index !== undefined) {
        room?.roomUsers.splice(index, 1);
      }
    },

    getRoomWithUser: (userId: number) =>
      [...rooms.values()].find((room) =>
        room.roomUsers.find((user) => user.index === userId),
      ),

    getUsersInRoom: (roomId: number) => rooms.get(roomId)?.roomUsers || [],

    addRoom: (room: RoomData) => rooms.set(room.roomId, room),

    removeRoom: (id: number) => {
      rooms.delete(id);
    },
  };
})();
