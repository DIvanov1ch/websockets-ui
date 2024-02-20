import { WinnersResponseData, WinnerData } from '../models/player.model';
import { Players_DB } from '../data-bases/players.db';
import { stringify } from '../utils/stringify';

export const createWinnersData = () => {
  const winners: WinnersResponseData = [...Players_DB.getAllPlayers()].map(
    (player) => {
      const { wins, name } = player;
      const winner: WinnerData = { name, wins };
      return winner;
    },
  );
  return stringify(winners);
};
