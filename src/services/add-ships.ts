import { randomInt } from 'node:crypto';
import { SHIPS } from '../constants/single-player-ships';
import { REQUIRED_NUMBER_OF_PLAYERS } from '../constants';
import { Game_DB } from '../data-bases/games.db';
import { GameState } from '../models/game.model';
import { ShipsRequestData } from '../models/ships.model';

export const addShips = (shipsData: ShipsRequestData): GameState => {
  const { gameId, indexPlayer, ships } = shipsData;
  const game = Game_DB.getGameById(gameId);
  game?.shipsMap.set(indexPlayer, ships);
  if (game?.singlePlay) {
    const randomShips = SHIPS[randomInt(SHIPS.length)];
    game?.shipsMap.set(0, randomShips);
    return { game, isReady: true };
  }
  const isReady = game?.shipsMap.size === REQUIRED_NUMBER_OF_PLAYERS;
  return { game, isReady };
};
