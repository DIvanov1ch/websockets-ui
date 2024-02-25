import { WebSocket } from 'ws';

export interface Player {
  name: string;
  index: number;
  password: string;
  wins: number;
  ws: WebSocket | null;
  error: boolean;
  errorText: string;
}

export interface LoginRequestData {
  name: string;
  password: string;
}

export interface LoginResponseData {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export interface WinnerData {
  name: string;
  wins: number;
}

export type WinnersResponseData = WinnerData[];

// export type LoginResult = { error: boolean; errorText: string };
