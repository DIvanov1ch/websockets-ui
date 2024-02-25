import { Game } from '../models/game.model';
import { sendGameStatus } from './send-game-status';
import { getResponse } from '../services/get-response';
import { HandshakeTypes } from '../enums/handshake-types';

export const sendTurn = (game: Game) => {
  const { turn, playerIds } = game;
  if (turn === null) {
    return;
  }
  const response = getResponse({ type: HandshakeTypes.TURN, turn });

  playerIds.forEach((id) => {
    sendGameStatus(id, response);
  });
};
