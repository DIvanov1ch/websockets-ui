import { Game, ShipOnBoard } from '../models/game.model';
import { Ship } from '../models/ships.model';

export const setPlayerBoard = (game: Game, id: number, ships: Ship[]) => {
  const playerBoard: ShipOnBoard[] = [];

  ships.forEach((ship) => {
    const { direction, length, position, type } = ship;

    const shipOnBoard: ShipOnBoard = {
      head: position,
      type,
      positions: [],
      length,
      direction,
      shots: 0,
    };

    for (let i = 0; i < length; i++) {
      const x = direction ? position.x : position.x + i;
      const y = direction ? position.y + i : position.y;
      shipOnBoard.positions.push({ x, y });
    }
    playerBoard.push(shipOnBoard);
  });
  game.boards.set(id, playerBoard);
};
