import { Game_DB } from '../data-bases/games.db';
import { Game } from '../models/game.model';
import { RoomData } from '../models/room.model';
import { generateIndex } from '../utils/generate-index';

export const createGame = (room: RoomData) => {
  const gameId = generateIndex('game');

  const [firstPlayer, secondPlayer] = room.roomUsers;
  const game: Game = {
    idGame: gameId,
    firstPlayerId: firstPlayer.index,
    secondPlayerId: secondPlayer.index,
  };
  Game_DB.addGame(game);

  return game;
};
