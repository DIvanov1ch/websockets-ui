import { stringify } from '../utils/stringify';
import { Game } from '../models/game.model';

export const createStartGameData = (game: Game) => {
  const startGameData = new Map<number, string>();
  [game.firstPlayerId, game.secondPlayerId].forEach((id) =>
    startGameData.set(
      id,
      stringify({ currentPlayerIndex: id, ships: game.ships.get(id)! }),
    ),
  );

  return startGameData;
};
