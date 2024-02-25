import { WebSocket } from 'ws';
import { Game_DB } from '../data-bases/games.db';
import { Players_DB } from '../data-bases/players.db';
import { HandshakeTypes } from '../enums/handshake-types';
import { Game } from '../models/game.model';
import { sendGameStatus } from './send-game-status';
import { getResponse } from '../services/get-response';
import { BOT_ID } from '../constants';

export const onVictory = (ws: WebSocket, game: Game, indexPlayer: number) => {
  const response = getResponse({
    type: HandshakeTypes.FINISH,
    playerId: indexPlayer,
  });
  const { playerIds, idGame } = game;
  playerIds.forEach((id) => sendGameStatus(id, response));

  Game_DB.removeGame(idGame);
  if (indexPlayer !== BOT_ID) {
    Players_DB.addVictory(indexPlayer);
  }

  ws.emit('updatewinners');
};
