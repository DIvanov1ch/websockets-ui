import { Position } from '../models/ships.model';
import { BOT_DELAY, BOT_ID } from '../constants';
import { WebSocket } from 'ws';
import { getRandomPosition } from './get-random-position';
import { Game_DB } from '../data-bases/games.db';
import { onAttack } from '../controllers/on-attack';

export const getBotAttack = (ws: WebSocket, gameId: number) => {
  const position: Position = getRandomPosition(gameId, BOT_ID);
  const game = Game_DB.getGameById(gameId);
  if (!game) {
    return;
  }

  console.log('Bot is thinking for 4s ...');
  setTimeout(() => onAttack(ws, game, BOT_ID, position), BOT_DELAY);
};
