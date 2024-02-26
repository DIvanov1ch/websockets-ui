import { Game_DB } from '../data-bases/games.db';
import { Players_DB } from '../data-bases/players.db';
import { HandshakeTypes } from '../enums/handshake-types';
import { loginPlayer } from '../middlewares/login-player';
import { AttackRequest, RandomAttack } from '../models/game.model';
import { Handshake } from '../models/handshake.model';
import { LoginRequestData, Player } from '../models/player.model';
import { RoomIndex } from '../models/room.model';
import { ShipsRequestData, Position } from '../models/ships.model';
import { createGame } from '../services/create-game';
import { createPlayer } from '../services/create-player';
import { createRoom } from '../services/create-room';
import { getRandomPosition } from '../services/get-random-position';
import { setPlayerBoard } from '../services/set-player-board';
import { setTurn } from '../services/set-turn';
import { getParsedData } from '../utils/parse-data';
import { stringify } from '../utils/stringify';
import { WebSocket } from 'ws';
import { addShips } from '../services/add-ships';
import { addUserToRoom } from '../services/add-user-to-room';
import { onAttack } from './on-attack';
import { sendGameStatus } from './send-game-status';
import { sendTurn } from './send-turn';
import { log } from '../utils/log';
import { getResponse } from '../services/get-response';
import { BOT_ID } from '../constants';
import { getBotAttack } from '../services/get-bot-attack';
import { clearRoom } from '../utils/clear-room';

export function onMessage(this: WebSocket, req: string): void {
  const request = getParsedData(req);
  const { type, data, id } = request as Handshake;
  const parsedData = getParsedData(data);
  log({ type, data, id }, 'request');

  if (type === HandshakeTypes.REG) {
    const credentials = parsedData as LoginRequestData;
    const { name, password } = credentials;
    const player: Player = Players_DB.hasPlayer(name)
      ? Players_DB.getPlayer(name)
      : createPlayer(credentials);
    loginPlayer(player, password, this);
    const response = getResponse({ type, player });
    this.send(response);

    if (!player.error) {
      this.emit('updaterooms');
      this.emit('updatewinners');
    }
  } else if (type === HandshakeTypes.CREATE_ROOM) {
    const room = createRoom(this);
    if (room === null) {
      return;
    }
    const data = stringify(room);
    log({ type, data, id }, 'result');

    this.emit('updaterooms');
  } else if (type === HandshakeTypes.ADD_USER_TO_ROOM) {
    const { indexRoom } = parsedData as RoomIndex;
    const { roomUsers, isReady } = addUserToRoom(indexRoom, this);

    this.emit('updaterooms');

    if (isReady) {
      const game = createGame({ singlePlay: false, roomUsers });
      const { playerIds, idGame } = game;
      playerIds.forEach((id) => {
        const response = getResponse({
          type: HandshakeTypes.CREATE_GAME,
          playerId: id,
          gameId: idGame,
        });

        sendGameStatus(id, response);
      });
    }
  } else if (type === HandshakeTypes.ADD_SHIPS) {
    const shipsData = parsedData as ShipsRequestData;
    const { game, isReady } = addShips(shipsData);

    if (!game) {
      return;
    }

    if (isReady) {
      const { playerIds, shipsMap } = game;
      playerIds.forEach((id) => {
        if (game.singlePlay && !id) {
          return;
        }
        const response = getResponse({
          type: HandshakeTypes.START_GAME,
          playerId: id,
          ships: shipsMap.get(id)!,
        });

        sendGameStatus(id, response);
      });

      shipsMap.forEach((ships, id) => setPlayerBoard(game, id, ships));

      setTurn(game);
      sendTurn(game);
    }
  } else if (type === HandshakeTypes.ATTACK) {
    const attack = parsedData as AttackRequest;
    const { indexPlayer, x, y, gameId } = attack;
    const game = Game_DB.getGameById(gameId);
    if (!game) {
      return;
    }
    const { turn, singlePlay } = game;

    if (turn !== indexPlayer) {
      console.log(`--- turnId: ${turn}, attackId: ${indexPlayer}. Not your turn!`);
      console.log();
      return;
    }

    const position: Position = { x, y };

    const shots = Game_DB.getPlayerShots(gameId, indexPlayer);
    const isWrongShot = shots?.has(stringify(position));
    if (isWrongShot) {
      // position = getRandomPosition(gameId, indexPlayer);
      console.log('--- That cell is already open. Next player goes.');
      console.log();
      setTurn(game);
      sendTurn(game);
      if (singlePlay && game.turn === BOT_ID) {
        getBotAttack(this, gameId);
      }
      return;
    }

    onAttack(this, game, indexPlayer, position);
  } else if (type === HandshakeTypes.RANDOM_ATTACK) {
    const attack = parsedData as RandomAttack;
    const { gameId, indexPlayer } = attack;
    const position: Position = getRandomPosition(gameId, indexPlayer);
    const game = Game_DB.getGameById(gameId);
    if (!game) {
      return;
    }

    onAttack(this, game, indexPlayer, position);
  } else if (type === HandshakeTypes.SINGLE_PLAY) {
    const { index } = Players_DB.getPlayerByWs(this)!;
    clearRoom(this, index);
    const { idGame } = createGame({ singlePlay: true, playerId: index });
    const response = getResponse({
      type: HandshakeTypes.CREATE_GAME,
      gameId: idGame,
      playerId: index,
    });
    this.send(response);
  } else {
    console.log('--->', type, parsedData);
  }
}
