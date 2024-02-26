import { Position } from '../models/ships.model';
import { randomInt } from 'node:crypto';
import { Game_DB } from '../data-bases/games.db';
import { stringify } from '../utils/stringify';
import { BOARD_SIZE } from '../constants';

const getRandomInt = () => randomInt(BOARD_SIZE);

export const getRandomPosition = (gameId: number, playerId: number): Position => {
  let position: Position = { x: getRandomInt(), y: getRandomInt() };

  const shots = Game_DB.getPlayerShots(gameId, playerId);
  const isWrongShot = shots?.has(stringify(position));
  if (isWrongShot) {
    position = getRandomPosition(gameId, playerId);
  }
  return position;
};
