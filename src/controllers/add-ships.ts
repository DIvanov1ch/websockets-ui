import { Game } from '../models/game.model';
import { ShipsRequestData } from '../models/ships.model';

const REQUIRED_NUMBER_OF_PLAYERS = 2;

export const addShips = (game: Game, req: ShipsRequestData) => {
  const { indexPlayer, ships } = req;
  game.ships.set(indexPlayer, ships);

  return game.ships.size === REQUIRED_NUMBER_OF_PLAYERS;
};
