import { TTokens } from "@src/token";
import { Window, TWindow } from "@src/window";
import { IBaseArray, IBaseObject } from "@src/IBase";

export type TPositionsObj = IBaseObject<number, number[]>;
type TMatchesObj = IBaseObject<string, string[]>;

export type TPositions = IBaseArray<TPositionsObj>;
export type TMatches = IBaseArray<TMatchesObj>;

class Context {
  private tokensMatch: number[] = [];

  private positionsArr: any = [];

  private matchesArr: any = [];

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
    this.calcPositions();
    return this.positionsArr;
  }

  get matches(): TMatches {
    this.calcMatches();
    return this.matchesArr;
  }

  private calcPositions(): void {
    this.searchInTokens();
    let out = this.tokensMatch.map((value, index) => {
      if (value === -1) {
        return null;
      }
      const { windows }: { windows: TWindow } = new Window(
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

  private calcMatches(): void {
    const matches: TMatches = this.positions.map((position: TPositionsObj) => {
      return this.matchPositionValues(position);
    });
    this.matchesArr = matches;
  }

  private searchInTokens(): void {
    this.tokensMatch = this.tokens.map((token: string) =>
      token.search(this.term),
    );
  }

  private matchPositionValues(position: TPositionsObj): object {
    let out: object = {};
    Object.keys(position).forEach((key: string) => {
      const sub = position[key];
      let values;
      const isSubArr: boolean = Array.isArray(sub);
      if (isSubArr) {
        values = sub.map((s: number) => this.tokens[s]);
      } else {
        values = this.tokens[sub];
      }
      out = { ...out, [key]: values };
    });
    return out;
  }
}

export { Context };
