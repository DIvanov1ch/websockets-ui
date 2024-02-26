import { WebSocket } from 'ws';
import { Player } from '../models/player.model';

export const Players_DB = (() => {
  const players = new Map<string, Player>();

  return {
    getPlayer: (name: string) => players.get(name)!,

    getPlayerByWs: (ws: WebSocket) =>
      [...players.values()].find((player) => player.ws === ws),

    hasPlayer: (name: string) => players.has(name),

    addNewPlayer: (player: Player) => {
      const { name } = player;
      players.set(name, player);
    },

    getPlayerById: (id: number) =>
      [...players.values()].find((player) => player.index === id),

    getAllPlayers: () => players.values(),

    addVictory: (id: number) => {
      const player = [...players.values()].find(
        (player) => player.index === id,
      )!;
      const { wins } = player;
      player.wins = wins + 1;
    },
  };
})();
