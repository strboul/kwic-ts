// TODO disperse those models

type HasKeys<T> = {
  // eslint-disable-next-line no-unused-vars
  [P in keyof T]: any;
};

interface Context {
  keyword: any;
  leftContext: any[];
  rightContext: any[];
}

export interface ContextMatch extends HasKeys<Context> {
  keyword: string;
  leftContext: string[];
  rightContext: string[];
}

export interface ContextPosition extends HasKeys<Context> {
  keyword: number;
  leftContext: number[];
  rightContext: number[];
}

export interface OutputContext {
  matches: ContextMatch;
  positions: ContextPosition;
}

export interface Output {
  [id: number]: OutputContext;
}

export interface Input {
  text: string;
  term: string;
  windowLeft?: number;
  windowRight?: number;
}
