import * as KwicModel from "./kwic.model";
import { TTokens } from "./token";
import Window from "./window";

class Context {
  private window: any;

  private matchTokens: number[] = [];

  private positions: any;

  private matches: any;

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

  getContext(): KwicModel.OutputContext {
    this.searchInTokens();
    this.calcPositions();
    this.findMatches();

    const out = { positions: this.positions, matches: this.matches };
    return out;
  }

  private findMatches(): void {
    const out = this.positions.map((position: any) => {
      return this.matchPositionValues(position);
    });
    this.matches = out;
  }

  private matchPositionValues(position: any): any {
    let out = {};
    Object.keys(position).forEach((key: any) => {
      const sub = position[key];
      let values;
      if (typeof sub === "object") {
        values = sub.map((sk: any) => this.tokens[sk]);
      } else {
        values = this.tokens[sub];
      }
      out = { ...out, [key]: values };
    });
    return out;
  }

  private calcPositions(): void {
    let out = this.matchTokens.map((value, index) => {
      if (value === -1) {
        return null;
      }
      const windowIdx = this.window.getWindowIdx(index);
      return windowIdx;
    });
    out = out.filter(Boolean);
    this.positions = out;
  }

  private searchInTokens(): void {
    this.matchTokens = this.tokens.map((token: string) =>
      token.search(this.term),
    );
  }
}

export default Context;
