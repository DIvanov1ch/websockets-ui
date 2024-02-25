export interface RoomIndex {
  indexRoom: number;
}

export interface RoomUser {
  name: string;
  index: number;
}

export interface RoomData {
  roomId: number;
  roomUsers: RoomUser[];
}

export type RoomState = { roomUsers: RoomUser[]; isReady: boolean };
