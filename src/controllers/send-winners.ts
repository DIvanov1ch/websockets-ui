import { RequestTypes } from '../enums/request-types';
import { Players_DB } from '../data-bases/players.db';
import { createResponse } from '../services/create-response';
import { createWinnersData } from '../services/create-winners-data';

export const sendWinners = () => {
  const winnersData = createWinnersData();
  const winnersResponse = createResponse(
    RequestTypes.UPDATE_WINNERS,
    winnersData,
  );
  const allPlayers = [...Players_DB.getAllPlayers()];
  allPlayers.forEach((player) => player.ws.send(winnersResponse));
};
