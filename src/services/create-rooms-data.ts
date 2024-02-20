import { stringify } from "../utils/stringify";
import { Rooms_DB } from "../data-bases/rooms.db";

export const createRoomsData = () => {
  const rooms = Rooms_DB.getAllRooms();
  return stringify(rooms);
}