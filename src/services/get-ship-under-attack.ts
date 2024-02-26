import { stringify } from '../utils/stringify';
import { Game, ShipOnBoard } from '../models/game.model';
import { Position } from '../models/ships.model';
import { getOpponentId } from './get-opponent-id';

const isUnderAttack = (
  ship: ShipOnBoard,
  attackedPosition: Position,
): boolean => {
  return !!ship.positions.find(
    (position) => stringify(position) === stringify(attackedPosition),
  );
};

export const getShipUnderAttack = (
  game: Game,
  position: Position,
  indexPlayer: number,
): ShipOnBoard | null => {
  const { boards } = game;
  const opponentId = getOpponentId(game, indexPlayer);
  const attackedBoard = boards.get(opponentId);
  const shipUnderAttack = attackedBoard?.find((ship) =>
    isUnderAttack(ship, position),
  );

  return shipUnderAttack || null;
};
