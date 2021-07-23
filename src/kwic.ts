import Position from "./position";
import Match from "./match";
import Token from "./token";
import Range from "./range";

class Kwic {
  private positions: any;

  /** Create a KWIC object
   * @param {string} text - text string to search keywords
   * @param {string} term - search term.
   * @param {number[]} windows - left and right window boundaries to look for
   * the adjacent keywords. It's an array with a length of 2. Default value is
   * 3 for left, and 3 for right sides.
   */
  constructor(
    public text: string,
    public term: string,
    public windows: number[] = [3, 3],
  ) {
    this.text = text;
    this.term = term;
    this.windows = windows;
  }

  get tokens(): any {
    return new Token(this.text).tokens;
  }

  getPositions(): any {
    const { positions } = new Position(this.tokens, this.term, this.windows);
    return this.returnIfValidInput(positions);
  }

  getMatches(): any {
    this.positions = this.getPositions();
    if (Kwic.isObjectEmpty(this.positions)) return [];
    const { matches } = new Match(this.tokens, this.positions);
    return this.returnIfValidInput(matches);
  }

  getRanges(): any {
    this.positions = this.getPositions();
    if (Kwic.isObjectEmpty(this.positions)) return [];
    const { ranges } = new Range(this.tokens, this.positions);
    return this.returnIfValidInput(ranges);
  }

  private static isObjectEmpty(obj: any): boolean {
    return obj.length === 0;
  }

  private returnIfValidInput(obj: any): any {
    return this.isValidInput() ? obj : [];
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
    return this.text.search(this.term) !== -1;
  }

  private isTermEmpty(): boolean {
    return this.term === "";
  }
}

export default Kwic;
