import { Players_DB } from '../data-bases/players.db';

export const sendGameStatus = (playerId: number, response: string) => {
  const player = Players_DB.getPlayerById(playerId);
  if (player?.ws) {
    player.ws.send(response);
  }
};
