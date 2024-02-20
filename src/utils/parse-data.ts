export type ParsedData = object | [] | string | number | boolean | null;

export const getParsedData = (data: string): ParsedData => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};
