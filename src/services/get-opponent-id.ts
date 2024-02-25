import { Game } from '../models/game.model';

export const getOpponentId = (game: Game, playerId: number) => {
  const { playerIds } = game;
  const opponentId = playerIds.find((id) => id !== playerId) || playerIds.at(0)!;
  return opponentId;
};
