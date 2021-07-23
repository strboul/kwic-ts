import { TTokens } from "./token";
import Window from "./window";

// TODO move it to a common file:
interface IBaseMethods {
  [x: string]: any;
}

// TODO standardize interfaces that the object keys have
// the same names:
export interface IPositionsObj {
  index: number;
  left: number[];
  right: number[];
}

interface IOutput<T> extends IBaseMethods {
  [index: number]: T;
}

export type TPositions = IOutput<IPositionsObj>;

class Position {
  private window: any;

  private tokensMatch: number[] = [];

  private positionsArr: any;

  constructor(
    public tokens: TTokens,
    public term: string,
    public windows: number[],
  ) {
    this.tokens = tokens;
    this.term = term;

    const tokensLen = tokens.length - 1;
    this.window = new Window(windows, tokensLen);
  }

  get positions(): TPositions {
    this.searchInTokens();
    this.calcPositions();
    return this.positionsArr;
  }

  private calcPositions(): void {
    let out = this.tokensMatch.map((value, index) => {
      if (value === -1) {
        return null;
      }
      const windows = this.window.getWindows(index);
      return windows;
    });
    out = out.filter(Boolean);
    this.positionsArr = out;
  }

  private searchInTokens(): void {
    this.tokensMatch = this.tokens.map((token: string) =>
      token.search(this.term),
    );
  }
}

export default Position;
