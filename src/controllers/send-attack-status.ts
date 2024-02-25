import { AttackStatus } from '../models/game.model';
import { HandshakeTypes } from '../enums/handshake-types';
import { Position } from '../models/ships.model';
import { sendGameStatus } from './send-game-status';
import { getResponse } from '../services/get-response';

export const sendAttackStatus = (
  playerIds: number[],
  indexPlayer: number,
  position: Position,
  status: AttackStatus,
) => {
  const response = getResponse({
    type: HandshakeTypes.ATTACK,
    currentPlayer: indexPlayer,
    position,
    status,
  });
  playerIds.forEach((id) => {
    sendGameStatus(id, response);
  });
};
