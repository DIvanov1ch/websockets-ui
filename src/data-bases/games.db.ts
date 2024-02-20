import { Game } from '../models/game.model';

export const Game_DB = (() => {
  const games: Game[] = [];

  return {
    getAllGames: () => games,

    addGame: (game: Game) => games.push(game),
  };
})();
