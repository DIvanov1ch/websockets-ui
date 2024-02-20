import { WebSocket } from 'ws';
import { verifyPlayer } from '../middlewares/verifyPlayer';
import { LoginRequestData, Player } from '../models/player.model';
import { generateIndex } from '../utils/generate-index';
import { Players_DB } from '../data-bases/players.db';

export const loginPlayer = (data: LoginRequestData, ws: WebSocket) => {
  const player = verifyPlayer(data);
  if (player !== null) {
    return null;
  }
  const index = generateIndex('player');
  const wins = 0;
  const { name, password } = data;
  const newPlayer: Player = { name, index, password, wins, ws };
  Players_DB.addPlayer(data, newPlayer);

  return newPlayer;
};
