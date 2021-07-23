import Utils from "./utils";
import { IWindow } from "./window";
import { TTokens } from "./token";

/** For array/objects to receive methods e.g. reduce
 */
interface IBaseMethods {
  [x: string]: any;
}

/** Interface fakes a tuple that it cannot have more than 2 elements
 */
interface IRangesTuple {
  0: number;
  1: number;
  2?: never;
}

interface IOutput<T> extends IBaseMethods {
  [index: number]: T;
}

type TPositions = IOutput<IWindow>;
type TRangesTupleGroup = IOutput<IRangesTuple>;

interface IRangesObjRange {
  index: IRangesTuple;
  left: TRangesTupleGroup;
  right: TRangesTupleGroup;
}

type TRanges = IOutput<IRangesObjRange>;

/** Range of strings
 *
 * Details: TODO
 *
 * Starting with an example.
 *
 * A sample text with bunch of spaces and new lines:
 *
 *    '   99 bottles of     beer on the wall,
 *    99 bottles of beer.
 *    Take one down, pass it
 *    around,   98   bottles   of
 *    beer on     the  wall...'
 *
 * Term:
 *
 *    'bottles'
 *
 * The range requires the three inputs: text, tokens, positions. The tokens
 * and positions are created from the sample text and the term.
 *
 * Tokens:
 *
 *    99
 *    bottles
 *    of
 *    beer
 *    on
 *    the
 *    wall,
 *    99
 *    bottles
 *    of
 *    beer.
 *    Take
 *    one
 *    down,
 *    pass
 *    it
 *    around,
 *    98
 *    bottles
 *    of
 *    beer
 *    on
 *    the
 *    wall...
 *
 * Positions:
 *
 *    index: 1 | left: 0 | right: 2, 3, 4
 *    index: 8 | left: 5, 6, 7 | right: 9, 10, 11
 *    index: 18 | left: 15, 16, 17 | right: 19, 20, 21
 *
 * Steps:
 *
 * 1) Anything after the highest right id of the highest index is taken out.
 *
 * General:
 *
 * - The Range algorithm, by default, reads the strings from left to right.
 * ---
 *
 * @class Range
 */
class Range {
  private subsetTokens: string[] = [];

  private subsetTokenNumChar: number[] = [];

  private rangesArr: TRanges = [];

  /** Create a range
   * @param {TTokens} tokens - tokens generated with {@link Token}
   * @param {TPositions} positions - positions generated with {@link Position}
   */
  constructor(public tokens: TTokens, public positions: TPositions) {
    this.tokens = tokens;
    this.positions = positions;
  }

  get ranges(): TRanges {
    this.subsetWindowTokens();
    this.countTokenChars();
    this.calcRanges();
    return this.rangesArr;
  }

  private calcRanges(): void {
    const ranges = this.positions.map((position: IWindow) => {
      const index = this.calculateIndexRange(position.left, position.index);
      const left = this.calculateArrRanges(position.left);
      const right = this.calculateArrRanges(position.right);
      return { index, left, right };
    });
    this.rangesArr = ranges;
  }

  /** Sum characters until the token position (always start from 0)
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

  private calculateIndexRange(leftIds: number[], index: number): number[] {
    if (leftIds.length === 0) {
      return [index, this.subsetTokenNumChar[index]];
    }
    const maxLeftId = Math.max(...leftIds);
    const sumLeftUntilIndex = this.sumCharsUntilPos(maxLeftId) + 1;

    const range = [
      sumLeftUntilIndex,
      sumLeftUntilIndex + this.subsetTokenNumChar[index],
    ];

    return range;
  }

  private calculateArrRanges(ids: number[]): TRangesTupleGroup {
    const minId: number = Math.min(...ids);

    const idStart: number =
      this.sumCharsUntilPos(minId) - this.subsetTokenNumChar[minId];

    const ranges: TRangesTupleGroup = [];

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
   * Technically, the left indices cannot be higher than the index, so only
   * check for the index and right indices.
   */
  private getMaximumPosition(): number {
    const highestIndex = this.getHighestIndex();
    const { index, right } = highestIndex;
    const combined = [index, ...right];
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
