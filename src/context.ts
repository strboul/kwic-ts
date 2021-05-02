import { Tokens } from "./kwic.model";
import Window from "./window";

class Context {
  private window: any;

  private matchTokens: number[] = [];
  private positions: any;
  private matches: any;

  constructor(
    public tokens: Tokens,
    public term: string,
    // TODO Partial<T> Window ??
    public windowLeft: number,
    public windowRight: number
  ) {
    this.tokens = tokens;
    this.term = term;

    const tokensLen = tokens.length;
    this.window = new Window(windowLeft, windowRight, tokensLen);
  }

  getContext() {
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
      const indexObj = { index: index };
      const positions = { ...indexObj, ...windowIdx };
      return positions;
    });
    out = out.filter(Boolean);
    this.positions = out;
  }

  private searchInTokens(): void {
    this.matchTokens = this.tokens.map((token) => token.search(this.term));
  }
}

export default Context;
