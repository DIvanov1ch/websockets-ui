import { Player, LoginResponseData } from '../models/player.model';
import { stringify } from '../utils/stringify';

const getErrorText = (error: boolean) =>
  error ? 'User already logged in' : '';

export const createLoginData = (player: Player | null) => {
  const { name, index } = player || { name: '', index: -1 };
  const error = player ? false : true;
  const errorText = getErrorText(error);
  const data: LoginResponseData = { name, index, error, errorText };

  return stringify(data);
};
