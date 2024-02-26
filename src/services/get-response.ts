import { stringify } from '../utils/stringify';
import { HandshakeTypes } from '../enums/handshake-types';
import { Players_DB } from '../data-bases/players.db';
import { WinnerData, WinnersResponseData } from '../models/player.model';
import { Rooms_DB } from '../data-bases/rooms.db';
import { Handshake } from '../models/handshake.model';
import { log } from '../utils/log';
import { Params } from '../models/response-data.model';

export const getResponse = (params: Params) => {
  let data = '';

  switch (params.type) {
    case HandshakeTypes.REG: {
      const { name, index, error, errorText } = params.player;
      data = stringify({ name, index, error, errorText });
      break;
    }

    case HandshakeTypes.UPDATE_ROOM:
      data = stringify(Rooms_DB.getAllRooms());
      break;

    case HandshakeTypes.UPDATE_WINNERS: {
      const winners: WinnersResponseData = [...Players_DB.getAllPlayers()].map(
        (player) => {
          const { wins, name } = player;
          const winner: WinnerData = { name, wins };
          return winner;
        },
      );
      data = stringify(winners);
      break;
    }

    case HandshakeTypes.CREATE_GAME:
      data = stringify({
        idGame: params.gameId,
        idPlayer: params.playerId,
      });
      break;

    case HandshakeTypes.START_GAME:
      data = stringify({
        currentPlayerIndex: params.playerId,
        ships: params.ships,
      });
      break;

    case HandshakeTypes.TURN:
      data = stringify({ currentPlayer: params.turn });
      break;

    case HandshakeTypes.ATTACK:
      data = stringify({
        currentPlayer: params.currentPlayer,
        position: params.position,
        status: params.status,
      });
      break;

    case HandshakeTypes.FINISH:
      data = stringify({ winPlayer: params.playerId });
      break;

    default:
      data = '';
      break;
  }

  const handshake: Handshake = { type: params.type, data, id: 0 };
  log(handshake, 'response');

  return stringify(handshake);
};
