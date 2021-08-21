import { TTokens } from "./token";
import { Window, IWindow } from "./window";
import { IBaseMethods } from "./IBaseMethods";

// TODO standardize interfaces that the object keys have
// the same names:
export interface IPositionsObj {
  index: number;
  left: number[];
  right: number[];
}

// TODO standardize and follow the keys:
// index, left, right
interface IMatchesObj {
  index: string;
  left: string[];
  right: string[];
}

interface IOutput<T> extends IBaseMethods {
  [index: number]: T;
}

export type TPositions = IOutput<IPositionsObj>;
type TMatches = IOutput<IMatchesObj>;

class Context {
  private tokensMatch: number[] = [];

  private positionsArr: any;

  private matchesArr: any;

  constructor(
    public tokens: TTokens,
    public term: string,
    public windowLeft: number,
    public windowRight: number,
  ) {
    this.tokens = tokens;
    this.term = term;
    this.windowLeft = windowLeft;
    this.windowRight = windowRight;
  }

  get positions(): TPositions {
    this.searchInTokens();
    this.calcPositions();
    return this.positionsArr;
  }

  get matches(): TMatches {
    this.calcMatches();
    return this.matchesArr;
  }

  private calcPositions(): void {
    let out = this.tokensMatch.map((value, index) => {
      if (value === -1) {
        return null;
      }
      const { windows }: { windows: IWindow } = new Window(
        this.windowLeft,
        this.windowRight,
        this.tokens,
        index,
      );
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

  private calcMatches(): void {
    const matches = this.positions.map((position: any) => {
      return this.matchPositionValues(position);
    });
    this.matchesArr = matches;
  }

  private matchPositionValues(position: any): any {
    let out = {};
    Object.keys(position).forEach((key: any) => {
      const sub = position[key];
      let values;
      if (Array.isArray(sub)) {
        values = sub.map((sk: any) => this.tokens[sk]);
      } else {
        values = this.tokens[sub];
      }
      out = { ...out, [key]: values };
    });
    return out;
  }
}

export { Context };
