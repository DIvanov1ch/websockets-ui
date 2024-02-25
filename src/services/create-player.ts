import { LoginRequestData, Player } from '../models/player.model';
import { generateIndex } from '../utils/generate-index';
import { Players_DB } from '../data-bases/players.db';

export const createPlayer = (data: LoginRequestData) => {
  const index = generateIndex('player');
  const wins = 0;
  const { name, password } = data;
  const newPlayer: Player = {
    name,
    index,
    password,
    wins,
    ws: null,
    error: false,
    errorText: '',
  };
  Players_DB.addNewPlayer(newPlayer);

  return newPlayer;
};
