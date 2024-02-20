import { log } from '../utils/log';
import { Handshake } from '../models/handshake.model';
import { stringify } from '../utils/stringify';

export const createResponse = (type: string, data: string): string => {
  const handshake: Handshake = { type, data, id: 0 };
  log(handshake, 'response');

  return stringify(handshake);
};
