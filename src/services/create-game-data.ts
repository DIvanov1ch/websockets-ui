import { Game } from '../models/game.model';
import { stringify } from '../utils/stringify';

export const createGameData = (game: Game) => {
  const gameDataMap = new Map<number, string>();
  [game.firstPlayerId, game.secondPlayerId].forEach((id) =>
    gameDataMap.set(id, stringify({ idGame: game.idGame, idPlayer: id })),
  );

  return gameDataMap;
};
