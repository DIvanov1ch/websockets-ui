import { WebSocket } from 'ws';
import { Player } from '../models/player.model';

const alreadyLoggedIn = 'User already logged in';

const incorrectCredentials = 'Username or password you entered is incorrect';

export const loginPlayer = (
  player: Player,
  password: string,
  ws: WebSocket,
) => {
  if (player.password !== password) {
    player.error = true;
    player.errorText = incorrectCredentials;
    return;
  }
  if (player.ws !== null) {
    player.error = true;
    player.errorText = alreadyLoggedIn;
    return;
  }
  player.ws = ws;
  player.error = false;
  player.errorText = '';
};
