import { stringify } from '../utils/stringify';
import { Game } from '../models/game.model';

export const createTurnData = (game: Game) => {
  const { turn } = game;
  const turnData = stringify({ currentPlayer: turn });

  return turnData;
};
