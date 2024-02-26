import { Handshake, HandshakeType } from '../models/handshake.model';

export const log = (handshake: Handshake, type: HandshakeType) => {
  if (type === 'request') {
    console.log('-->', handshake.type, '--', handshake.data);
    console.log();
  }
  if (type === 'response') {
    console.log('<--', handshake.type, '--', handshake.data);
    console.log();
  }
  if (type === 'result') {
    console.log('---', handshake.type, '--', handshake.data);
    console.log();
  }
};
