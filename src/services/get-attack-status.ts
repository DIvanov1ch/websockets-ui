import { AttackStatus, ShipOnBoard } from '../models/game.model';

export const getAttackStatus = (ship: ShipOnBoard | null): AttackStatus => {
  if (ship === null) {
    return 'miss';
  }
  ship.shots = ship.shots += 1;
  if (ship.length === ship.shots) {
    return 'killed';
  }
  return 'shot';
};
