import { LoginRequestData, Player } from 'src/models/player.model';
import { Players_DB } from '../data-bases/players.db';

export const verifyPlayer = (credentials: LoginRequestData): Player | null => {
  if (Players_DB.hasPlayer(credentials)) {
    return Players_DB.getPlayer(credentials);
  }
  return null;
};
