import { Handshake } from '../models/handshake.model';

export type HandshakeType = 'response' | 'request';

export const log = (handshake: Handshake, type: HandshakeType) => {
  if (type === 'request') {
    console.log('-->', handshake.type, '--', handshake.data);
  }
  if (type === 'response') {
    console.log('<--', handshake.type, '--', handshake.data);
  }
};
