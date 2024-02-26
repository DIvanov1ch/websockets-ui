import { BOT_ID } from '../constants';
import { Game } from '../models/game.model';
import { randomInt } from 'node:crypto';

const flipCoin = () => randomInt(0, 2);

export const setTurn = (game: Game) => {
  const { playerIds, turn, singlePlay } = game;

  if (singlePlay && turn === null) {
    game.turn = playerIds.find((id) => id !== BOT_ID)!;
    return;
  }

  if (turn === null) {
    game.turn = playerIds.at(flipCoin()) || playerIds[playerIds.length - 1];
    return;
  }

  game.turn = turn === playerIds.at(0) ? playerIds.at(1)! : playerIds.at(0)!;
};
