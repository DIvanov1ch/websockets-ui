import { WebSocketServer } from 'ws';
import { Handshake } from '../models/handshake.model';
import { getParsedData } from '../utils/parse-data';
import { RequestTypes } from '../enums/request-types';
import { loginPlayer } from '../controllers/login-player';
import { LoginRequestData } from '../models/player.model';
import { createResponse } from '../services/create-response';
import { createRoom } from '../controllers/create-room';
import { createLoginData } from '../services/create-login-data';
import { stringify } from '../utils/stringify';
import { RoomIndex } from '../models/room.model';
import { addUserToRoom } from '../controllers/add-user-to-room';
import { sendRooms } from '../controllers/send-rooms';
import { sendWinners } from '../controllers/send-winners';
import { createGameData } from '../services/create-game-data';
import { sendGame } from '../controllers/send-game';
import { log } from '../utils/log';
import { createGame } from '../controllers/create-game';

const DEFAULT_PORT = 3000;

const port = Number(process.env.PORT) || DEFAULT_PORT;

export const wss = new WebSocketServer({ port });

wss.on('connection', function connection(ws) {
  const onMessage = (req: string): void => {
    const request = getParsedData(req);
    const { type, data, id } = request as Handshake;
    const parsedData = getParsedData(data);
    log({ type, data, id }, 'request');

    if (type === RequestTypes.REG) {
      const credentials = parsedData as LoginRequestData;
      const player = loginPlayer(credentials, ws);
      const loginData = createLoginData(player);
      const loginResponse = createResponse(type, loginData);
      ws.send(loginResponse);

      sendRooms();
      sendWinners();
    } else if (type === RequestTypes.CREATE_ROOM) {
      const room = createRoom(ws);
      const data = stringify(room);
      log({ type, data, id }, 'response');

      sendRooms();
    } else if (type === RequestTypes.ADD_USER_TO_ROOM) {
      const roomIndex = parsedData as RoomIndex;
      const { room, isReady } = addUserToRoom(roomIndex.indexRoom, ws);
      const data = stringify(room);
      log({ type, data, id }, 'response');

      sendRooms();

      if (isReady) {
        const game = createGame(room);
        const gameData = createGameData(game);
        gameData.forEach((data, id) => {
          const gameResponse = createResponse(RequestTypes.CREATE_GAME, data);
          sendGame(id, gameResponse);
        });
      }
    } else if (type === RequestTypes.ADD_SHIPS) {
      console.log(RequestTypes.ADD_SHIPS);
    } else {
      console.log('--->', type, parsedData);
    }
  };

  ws.on('error', console.error);

  ws.on('message', onMessage);

  ws.on('close', function close() {
    console.log('disconnected');
  });
});
