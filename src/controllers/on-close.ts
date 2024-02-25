import { WebSocket } from 'ws';
import { Game_DB } from '../data-bases/games.db';
import { Players_DB } from '../data-bases/players.db';
import { getOpponentId } from '../services/get-opponent-id';
import { onVictory } from './on-victory';
import { clearRoom } from '../utils/clear-room';

export function onClose(this: WebSocket) {
  const player = Players_DB.getPlayerByWs(this);
  if (player) {
    const { index, name } = player;

    clearRoom(this, index);

    const game = Game_DB.getGameByPlayerId(index);
    if (game) {
      const opponentId = getOpponentId(game, index);
      onVictory(this, game, opponentId);
    }
    player.ws = null;
    console.log(`${name} has logged out`);
    console.log();
    return;
  }
  console.log('disconnected');
  console.log();
}
