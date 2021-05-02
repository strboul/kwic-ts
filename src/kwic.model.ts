export interface Input {
  text: string;
  term: string;
  windowLeft?: number;
  windowRight?: number;
}

export interface OutputObject {
  matches: OutputObjectMatches;
  positions: OutputObjectPositions;
}

export interface OutputObjectMatches {
  keyword: string;
  leftContext: string[];
  rightContext: string[];
}

export interface OutputObjectPositions {
  keyword: number;
  leftContext: number[];
  rightContext: number[];
}

export interface Output {
  [id: number]: OutputObject;
}

export type Tokens = string[];
