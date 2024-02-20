import { WebSocket } from 'ws';
import { LoginRequestData, Player } from '../models/player.model';
import { stringify } from '../utils/stringify';

export const Players_DB = (() => {
  const players = new Map<string, Player>();

  return {
    getPlayer: (credentials: LoginRequestData) =>
      players.get(stringify(credentials))!,

    getPlayerByWs: (ws: WebSocket) =>
      [...players.values()].find((player) => player.ws === ws),

    hasPlayer: (credentials: LoginRequestData) =>
      players.has(stringify(credentials)),

    addPlayer: (credentials: LoginRequestData, player: Player) => {
      players.set(stringify(credentials), player);
    },

    getPlayerById: (id: number) =>
      [...players.values()].find((player) => player.index === id),

    getAllPlayers: () => players.values(),
  };
})();
