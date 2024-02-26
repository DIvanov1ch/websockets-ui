import { BOT_ID } from '../constants';
import { Game_DB } from '../data-bases/games.db';
import { Game, GameParams } from '../models/game.model';
import { generateIndex } from '../utils/generate-index';

export const createGame = (params: GameParams) => {
  const gameId = generateIndex('game');

  const { singlePlay } = params;

  const [{ index: firstId }, { index: secondId }] = singlePlay
    ? [{ index: BOT_ID }, { index: params.playerId }]
    : params.roomUsers;

  const game: Game = {
    idGame: gameId,
    playerIds: [firstId, secondId],
    shipsMap: new Map(),
    turn: null,
    boards: new Map(),
    score: {},
    shots: new Map(),
    singlePlay,
  };

  const { playerIds, score, shots } = game;
  playerIds.forEach((id) => {
    score[id] = 0;
    shots.set(id, new Set());
  });

  Game_DB.addGame(game);

  return game;
};
