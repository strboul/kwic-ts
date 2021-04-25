import * as KwicModel from "./kwic.model";
import { seq } from "./utils";

class Kwic implements KwicModel.Input {
  public text: string;
  public term: string;

  constructor(
    text: string,
    term: string,
    public windowLeft: number = 3,
    public windowRight: number = 3
  ) {
    this.text = text;
    this.term = term;
    this.windowLeft = windowLeft;
    this.windowRight = windowRight;
  }

  locate2(): KwicModel.Output {
    const output = ["apple", "orange", "pear"].map((xi) => {
      return {
        matches: {
          keyword: "apple",
          leftContext: [xi, "b", "c"],
          rightContext: ["x", "y", "z"],
        },
        positions: {
          keyword: 1,
          leftContext: [1, 2, 3],
          rightContext: [7, 8, 9],
        },
      };
    });
    return output;
  }

  locate() {
    let kf = new KwicFinder(
      this.text,
      this.term,
      this.windowLeft,
      this.windowRight
    );
    return kf.main();
  }
}

class KwicFinder {
  private tokens: string[] = [];
  private matchTokens: number[] = [];

  private positions: Object | null = [];
  private matches: Object | null = [];

  constructor(
    public text: string,
    public term: string,
    public windowLeft: number,
    public windowRight: number
  ) {
    this.text = text;
    this.term = term;
  }

  public main() {
    const hasTerm = this.hasTerm();
    if (hasTerm) {
      return null;
    }

    this.removeExtraSpacesFromText();
    this.tokenizeText();
    this.searchInTokens();

    this.getPositions();
    this.getMatches();

    let out = { ...this.positions, ...this.matches };
    return out;
  }

  private hasTerm() {
    return this.text.includes(this.term);
  }

  private removeExtraSpacesFromText(): void {
    this.text = this.text.replace(/\n/g, " ");
    this.text = this.text.replace(/\s+/g, " ");
  }

  private tokenizeText(): void {
    this.tokens = this.text.split(" ");
  }

  private searchInTokens(): void {
    this.matchTokens = this.tokens.map((token) => token.search(this.term));
  }

  private getPositions(): void {
    let out = this.matchTokens.map((value, index) => {
      if (value !== 0) {
        return null;
      }
      const windowIdx = this.getWindowIdx(index);
      return windowIdx;
    });
    out = out.filter(Boolean);
    this.positions = out;
  }

  /** Calculates the window indices
   *
   * @param  matchIndex index position of the array.
   */
  private getWindowIdx(matchIndex: number): Object {
    let windowLeftId = matchIndex - this.windowLeft;
    windowLeftId = windowLeftId < 0 ? 0 : windowLeftId;
    let windowLeftIdx = seq(windowLeftId, matchIndex - 1);

    const lenMatchTokens: number = this.matchTokens.length;

    let windowRightId = matchIndex + this.windowRight;
    windowRightId =
      windowRightId > lenMatchTokens ? lenMatchTokens : windowRightId;
    let windowRightIdx = seq(matchIndex + 1, windowRightId);

    return {
      keyword: matchIndex,
      leftContext: windowLeftIdx,
      rightContext: windowRightIdx,
    };
  }

  private getMatches(): void {
    this.matches = this.positions.map((position: number) => {
      const keyword: string = this.tokens[this.positions[position]["keyword"]];

      const leftContext: string[] = this.getContextMatchValuesMultiple(
        this.positions[position]["leftContext"]
      );
      const rightContext: string[] = this.getContextMatchValuesMultiple(
        this.positions[position]["rightContext"]
      );

      return {
        keyword,
        leftContext,
        rightContext,
      };
    });
  }

  private getContextMatchValuesMultiple(contextArr: number[]): string[] {
    return contextArr.map((p) => this.tokens[p]);
  }
}

export default Kwic;
