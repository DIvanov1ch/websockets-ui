import { randomInt } from 'node:crypto';
import { Players_DB } from '../data-bases/players.db';
import { Rooms_DB } from '../data-bases/rooms.db';
import { Game_DB } from '../data-bases/games.db';

const END_OF_RANGE = 2 ** 48 - 1;

type IndexType = 'room' | 'player' | 'game';

const findUser = (index: number) =>
  [...Players_DB.getAllPlayers()].find((player) => player.index === index);

const findRoom = (index: number) =>
  Rooms_DB.getAllRooms().find((room) => room.roomId === index);

const findGame = (index: number) =>
  Game_DB.getAllGames().find((game) => game.idGame === index);

export const generateIndex = (type: IndexType): number => {
  let index = randomInt(END_OF_RANGE);
  const existIndex =
    type === 'player'
      ? findUser(index)
      : type === 'room'
        ? findRoom(index)
        : findGame(index);

  if (existIndex) {
    index = generateIndex(type);
  }

  return index;
};
