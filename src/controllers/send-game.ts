import { Players_DB } from '../data-bases/players.db';

export const sendGame = (playerId: number, response: string) => {
  Players_DB.getPlayerById(playerId)!.ws.send(response);
};
