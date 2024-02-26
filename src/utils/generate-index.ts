import { randomInt } from 'node:crypto';
import { Players_DB } from '../data-bases/players.db';
import { Rooms_DB } from '../data-bases/rooms.db';
import { Game_DB } from '../data-bases/games.db';
import { END_OF_INTEGER_RANGE } from '../constants';

type IndexType = 'room' | 'player' | 'game';

export const generateIndex = (type: IndexType): number => {
  let index = randomInt(1, END_OF_INTEGER_RANGE);
  const isExistingIndex =
    type === 'player'
      ? !!Players_DB.getPlayerById(index)
      : type === 'room'
        ? !!Rooms_DB.getRoomById(index)
        : !!Game_DB.getGameById(index);

  if (isExistingIndex) {
    index = generateIndex(type);
  }

  return index;
};
