import { WebSocket } from 'ws';
import { Player } from '../models/player.model';

const alreadyLoggedIn = 'User already logged in';

const incorrectCredentials = 'Username or password you entered is incorrect';

const setLoginError = (player: Player, isError: boolean, text: string) => {
  player.error = isError;
  player.errorText = text;
};

export const loginPlayer = (
  player: Player,
  password: string,
  ws: WebSocket,
) => {
  if (player.password !== password) {
    setLoginError(player, true, incorrectCredentials);
    return;
  }
  if (player.ws !== null) {
    setLoginError(player, true, alreadyLoggedIn);
    return;
  }
  player.ws = ws;
  setLoginError(player, false, '');
};
