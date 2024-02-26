import { ParsedData } from "../models/handshake.model";

export const getParsedData = (data: string): ParsedData => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};
