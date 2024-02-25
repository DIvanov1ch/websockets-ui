import { Game } from '../models/game.model';

export const Game_DB = (() => {
  const games: Game[] = [];

  return {
    getAllGames: () => games,

    getGameById: (id: number) => games.find((game) => game.idGame === id),

    getGameByPlayerId: (id: number) =>
      games.find((game) => game.playerIds.includes(id)),

    addGame: (game: Game) => games.push(game),

    removeGame: (id: number) => {
      const index = games.findIndex((game) => game.idGame === id);
      games.splice(index, 1);
    },

    getShots: (gameId: number) =>
      games.find((game) => game.idGame === gameId)?.shots,

    getPlayerShots: (gameId: number, playerId: number) =>
      games.find((game) => game.idGame === gameId)?.shots.get(playerId),
  };
})();
