import Utils from "./utils";
import { IWindow } from "./window";
import { TTokens } from "./token";

interface IBaseMethods {
  [x: string]: any; // for methods e.g. `reduce`
}

interface IPositions extends IBaseMethods {
  [index: number]: IWindow;
}

interface IRangesArr {
  0: number;
  1: number;
  2?: never;
}

interface IRangesArrGroup extends IBaseMethods {
  [index: number]: IRangesArr;
}

interface IRangesObjRange {
  index: IRangesArr;
  left: IRangesArrGroup;
  right: IRangesArrGroup;
}

interface IRanges {
  [index: number]: IRangesObjRange;
}

class Range {
  private subsetTokens: string[] = [];

  private subsetTokenNumChar: number[] = [];

  constructor(public tokens: TTokens, public positions: IPositions) {
    this.tokens = tokens;
    this.positions = positions;
  }

  /** Sum characters until the token position (always start from 0)
   *
   * @param position position of the token.
   */
  private sumCharsUntilPos(position: number): number {
    const prev: number = Utils.sum(
      this.subsetTokenNumChar.slice(0, position + 1),
    );
    // add num spaces equal to position:
    const numOfSingleSpaces: number = position;
    const out = prev + numOfSingleSpaces;
    return out;
  }

  getRanges(): IRanges {
    this.subsetWindowTokens();
    this.countTokenChars();

    const out = this.positions.map((position: IWindow) => {
      const index = this.calculateIndexRange(position.leftIdx, position.index);
      const left = this.calculateArrRanges(position.leftIdx);
      const right = this.calculateArrRanges(position.rightIdx);
      return { index, left, right };
    });

    return out;
  }

  private calculateIndexRange(leftIds: number[], index: number): number[] {
    if (leftIds.length === 0) {
      return [index, this.subsetTokenNumChar[index] - 1];
    }
    const maxLeftId = Math.max(...leftIds);
    const sumLeftUntilIndex = this.sumCharsUntilPos(maxLeftId) + 1;

    const range = [
      sumLeftUntilIndex,
      sumLeftUntilIndex + this.subsetTokenNumChar[index] - 1,
    ];

    return range;
  }

  private calculateArrRanges(ids: number[]): IRangesArrGroup {
    const minId: number = Math.min(...ids);

    const idStart: number =
      this.sumCharsUntilPos(minId) - this.subsetTokenNumChar[minId];

    const ranges: IRangesArrGroup = [];

    ids.reduce((prev: number, curr: number) => {
      const to = prev + this.subsetTokenNumChar[curr];
      ranges.push([prev, to]);
      const next = to + 1;
      return next;
    }, idStart);

    return ranges;
  }

  private subsetWindowTokens(): void {
    const maxPos = this.getMaximumPosition();
    // +1 to include the endIndex:
    const maxPosInclude = maxPos + 1;
    this.subsetTokens = this.tokens.slice(0, maxPosInclude);
  }

  private countTokenChars(): void {
    this.subsetTokenNumChar = this.subsetTokens.map(
      (token: string) => token.length,
    );
  }

  /**
   * Technically, the left idx cannot be higher than the index, so only check
   * for the index and rightIdx.
   */
  private getMaximumPosition(): number {
    const highestIndex = this.getHighestIndex();
    const { index, rightIdx } = highestIndex;
    const combined = [index, ...rightIdx];
    const maxCombined = Math.max(...combined);
    return maxCombined;
  }

  /**
   * Get the object with the highest index number
   */
  private getHighestIndex(): IWindow {
    return this.positions.reduce(
      (prev: IWindow, curr: IWindow) => (prev.index > curr.index ? prev : curr),
      {},
    );
  }
}

export default Range;
