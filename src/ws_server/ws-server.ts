import WebSocket, { WebSocketServer } from 'ws';
import { DEFAULT_PORT } from '../constants';
import { onClose } from '../controllers/on-close';
import { onMessage } from '../controllers/on-message';
import { getResponse } from '../services/get-response';
import { HandshakeTypes } from '../enums/handshake-types';

const port = Number(process.env.PORT) || DEFAULT_PORT;

export const wss = new WebSocketServer({ port });

wss.on('connection', (ws) => {
  console.log('connected');
  console.log(`Number of clients: ${wss.clients.size}`);
  console.log();

  ws.on('error', console.error);

  ws.on('message', onMessage);

  ws.on('close', onClose);

  ws.on('updaterooms', () => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(getResponse({ type: HandshakeTypes.UPDATE_ROOM }));
      }
    });
  });

  ws.on('updatewinners', () => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(getResponse({ type: HandshakeTypes.UPDATE_WINNERS }));
      }
    });
  });
});
