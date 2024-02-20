import { WebSocketServer } from 'ws';
import { Handshake } from '../models/handshake.model';
import { getParsedData } from '../utils/parse-data';
import { HandshakeTypes } from '../enums/handshake-types';
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
import { sendGameStatus } from '../controllers/send-game-status';
import { log } from '../utils/log';
import { createGame } from '../controllers/create-game';
import { ShipsRequestData } from '../models/ships.model';
import { addShips } from '../controllers/add-ships';
import { createStartGameData } from '../services/create-start-game-data';
import { createTurnData } from '../services/create-turn-data';
import { Game_DB } from '../data-bases/games.db';

const DEFAULT_PORT = 3000;

const port = Number(process.env.PORT) || DEFAULT_PORT;

export const wss = new WebSocketServer({ port });

wss.on('connection', (ws) => {
  const onMessage = (req: string): void => {
    const request = getParsedData(req);
    const { type, data, id } = request as Handshake;
    const parsedData = getParsedData(data);
    log({ type, data, id }, 'request');

    if (type === HandshakeTypes.REG) {
      const credentials = parsedData as LoginRequestData;
      const player = loginPlayer(credentials, ws);
      const loginData = createLoginData(player);
      const loginResponse = createResponse(type, loginData);
      ws.send(loginResponse);

      sendRooms();
      sendWinners();
    } else if (type === HandshakeTypes.CREATE_ROOM) {
      const room = createRoom(ws);
      const data = stringify(room);
      log({ type, data, id }, 'response');

      sendRooms();
    } else if (type === HandshakeTypes.ADD_USER_TO_ROOM) {
      const roomIndex = parsedData as RoomIndex;
      const { room, isReady } = addUserToRoom(roomIndex.indexRoom, ws);
      const data = stringify(room);
      log({ type, data, id }, 'response');

      sendRooms();

      if (isReady) {
        const game = createGame(room);
        const gameData = createGameData(game);
        gameData.forEach((data, id) => {
          const gameResponse = createResponse(HandshakeTypes.CREATE_GAME, data);
          sendGameStatus(id, gameResponse);
        });
      }
    } else if (type === HandshakeTypes.ADD_SHIPS) {
      const request = parsedData as ShipsRequestData;
      const { gameId } = request;
      const game = Game_DB.getGameById(gameId);
      const isReadyToStart = addShips(game, request);

      if (isReadyToStart) {
        const startGameData = createStartGameData(game);
        startGameData.forEach((data, id) => {
          const startGameResponse = createResponse(
            HandshakeTypes.START_GAME,
            data,
          );
          sendGameStatus(id, startGameResponse);
        });

        const turnData = createTurnData(game);
        const turnResponse = createResponse(HandshakeTypes.TURN, turnData);
        const { firstPlayerId, secondPlayerId } = game;
        [firstPlayerId, secondPlayerId].forEach((id) =>
          sendGameStatus(id, turnResponse),
        );
      }
    } else {
      console.log('--->', type, parsedData);
    }
  };

  ws.on('error', console.error);

  ws.on('message', onMessage);

  ws.on('close', () => {
    console.log('disconnected');
  });
});
