import { Game } from '../models/game.model';

export const Game_DB = (() => {
  const games: Game[] = [];

  return {
    getAllGames: () => games,

    getGameById: (id: number) => games.find((game) => game.idGame === id)!,

    addGame: (game: Game) => games.push(game),
  };
})();
