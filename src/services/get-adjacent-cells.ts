import { Position } from '../models/ships.model';
import { ShipOnBoard } from '../models/game.model';
import { BOARD_SIZE } from '../constants';

const getAdjacesdntCells = (
  cell: Position,
  direction: boolean,
  length: number,
): Position[] => {
  const { x, y } = cell;
  const adjacentCells: Position[] = [];

  const v = direction ? length : 1;
  const h = direction ? 1 : length;

  let m = x - 1;
  let n = y - 1;
  while (m < x + h) {
    adjacentCells.push({ x: m, y: n });
    m = m + 1;
  }

  while (n < y + v) {
    adjacentCells.push({ x: m, y: n });
    n = n + 1;
  }

  while (m > x - 1) {
    adjacentCells.push({ x: m, y: n });
    m = m - 1;
  }

  while (n != y - 1) {
    adjacentCells.push({ x: m, y: n });
    n = n - 1;
  }
  return adjacentCells;
};

const removeNonexistentCells = (cells: Position[]) => {
  return cells.filter(
    (cell) =>
      cell.x >= 0 && cell.x < BOARD_SIZE && cell.y >= 0 && cell.y < BOARD_SIZE,
  );
};

export const getAdjacentShipCells = (ship: ShipOnBoard) => {
  const { head, length, direction } = ship;
  const cells = getAdjacesdntCells(head, direction, length);
  const adjacentCells = removeNonexistentCells(cells);

  return adjacentCells;
};
