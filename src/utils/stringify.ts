import { Handshake, HandshakeData } from '../models/handshake.model';

export const stringify = (value: HandshakeData | Handshake) =>
  JSON.stringify(value);
