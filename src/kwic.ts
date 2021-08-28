import { Context, TPositions, TMatches } from "@src/context";
import { Token, TTokens } from "@src/token";
import { Range, TRanges } from "@src/range";
import { TWindowElement } from "@src/window";
import { Utils } from "@src/utils";

class Kwic {
  private windowLeft!: number;

  private windowRight!: number;

  /** Create a KWIC object
   * @param {string} text - text string to search keywords
   * @param {string} term - search term.
   * @param {TWindowElement} windows - left and right window boundaries to look
   * for the adjacent keywords. It's an array with a length of 2. Default value
   * is 3 for left, and 3 for right sides.
   */
  constructor(
    public text: string,
    public term: string,
    public windows: TWindowElement,
  ) {
    this.text = text;
    this.term = term;
    this.setWindows(windows);
  }

  getPositions(): TPositions {
    return this.returnIfValid(() => {
      const { positions } = new Context(
        this.tokens,
        this.term,
        this.windowLeft,
        this.windowRight,
      );
      return positions;
    });
  }

  getMatches(): TMatches {
    return this.returnIfValid(() => {
      const { matches } = new Context(
        this.tokens,
        this.term,
        this.windowLeft,
        this.windowRight,
      );
      return matches;
    });
  }

  getRanges(): TRanges {
    return this.returnIfValid(() => {
      const positions = this.getPositions();
      if (Utils.isObjectEmpty(positions)) {
        return [];
      }
      const { ranges } = new Range(this.tokens, positions);
      return ranges;
    });
  }

  private setWindows(windows: number[]): void {
    const [windowLeft, windowRight] = windows;
    this.windowLeft = windowLeft;
    this.windowRight = windowRight;
  }

  private get tokens(): TTokens {
    return new Token(this.text).tokens;
  }

  private returnIfValid(fn: Function): any {
    if (!this.isValidInput()) {
      return [];
    }
    return fn();
  }

  private isValidInput(): boolean {
    const hasTerm: boolean = this.hasTerm();
    const isTermEmpty: boolean = this.isTermEmpty();
    if (!hasTerm || isTermEmpty) {
      return false;
    }
    return true;
  }

  private hasTerm(): boolean {
    let res!: number;
    try {
      res = this.text.search(this.term);
    } catch (error) {
      if (error instanceof SyntaxError) {
        res = -1;
      }
    }
    const isValue: boolean = res !== -1;
    return isValue;
  }

  private isTermEmpty(): boolean {
    return this.term === "";
  }
}

export { Kwic };
