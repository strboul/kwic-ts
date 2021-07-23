import { TTokens } from "./token";
import { TPositions } from "./position";

// TODO reduce duplication:
interface IOutput<T> {
  [index: number]: T;
}

// TODO standardize and follow the keys:
// index, left, right
interface IMatchesObj {
  index: string;
  left: string[];
  right: string[];
}

type TMatches = IOutput<IMatchesObj>;

class Match {
  private matchesArr: TMatches = [];

  constructor(public tokens: TTokens, public positions: TPositions) {
    this.tokens = tokens;
    this.positions = positions;
  }

  get matches(): TMatches {
    this.calcMatches();
    return this.matchesArr;
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
      if (typeof sub === "object") {
        values = sub.map((sk: any) => this.tokens[sk]);
      } else {
        values = this.tokens[sub];
      }
      out = { ...out, [key]: values };
    });
    return out;
  }
}

export default Match;
