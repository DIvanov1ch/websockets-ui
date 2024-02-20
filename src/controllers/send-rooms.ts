import { Players_DB } from '../data-bases/players.db';
import { RequestTypes } from '../enums/request-types';
import { createResponse } from '../services/create-response';
import { createRoomsData } from '../services/create-rooms-data';

export const sendRooms = () => {
  const roomsData = createRoomsData();
  const roomsResponse = createResponse(RequestTypes.UPDATE_ROOM, roomsData);
  const allPlayers = [...Players_DB.getAllPlayers()];
  allPlayers.forEach((player) => player.ws.send(roomsResponse));
};
