import { Game_DB } from '../data-bases/games.db';
import { Game, ShipOnBoard } from '../models/game.model';
import { Position } from '../models/ships.model';
import { getAdjacentShipCells } from '../services/get-adjacent-cells';
import { getAttackStatus } from '../services/get-attack-status';
import { getShipUnderAttack } from '../services/get-ship-under-attack';
import { setTurn } from '../services/set-turn';
import { sendAttackStatus } from './send-attack-status';
import { sendTurn } from './send-turn';
import { stringify } from '../utils/stringify';
import { BOT_ID, SHIPS_TO_WIN } from '../constants';
import { onVictory } from './on-victory';
import { WebSocket } from 'ws';
import { getBotAttack } from '../services/get-bot-attack';

export const onAttack = (
  ws: WebSocket,
  game: Game,
  indexPlayer: number,
  position: Position,
) => {
  const shipUnderAttack = getShipUnderAttack(game, position, indexPlayer);
  const attackStatus = getAttackStatus(shipUnderAttack);
  const { score, idGame, playerIds, singlePlay } = game;
  const shots = Game_DB.getPlayerShots(idGame, indexPlayer);

  if (attackStatus === 'killed') {
    const { positions } = shipUnderAttack as ShipOnBoard;
    const cells = getAdjacentShipCells(shipUnderAttack!);

    positions.forEach((position) => {
      sendAttackStatus(playerIds, indexPlayer, position, attackStatus);
      shots?.add(stringify(position));
    });
    cells.forEach((cell) => {
      sendAttackStatus(playerIds, indexPlayer, cell, 'miss');
      shots?.add(stringify(cell));
    });

    score[indexPlayer] = score[indexPlayer] + 1;

    if (score[indexPlayer] === SHIPS_TO_WIN) {
      onVictory(ws, game, indexPlayer);
      return;
    }

    sendTurn(game);

    if (singlePlay && game.turn === BOT_ID) {
      getBotAttack(ws, idGame);
    }
    return;
  }

  sendAttackStatus(playerIds, indexPlayer, position, attackStatus);
  shots?.add(stringify(position));

  if (attackStatus === 'miss') {
    setTurn(game);
  }

  sendTurn(game);

  if (singlePlay && game.turn === BOT_ID) {
    getBotAttack(ws, idGame);
  }
};
