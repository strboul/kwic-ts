import { Utils } from "./utils";
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
 * The Range algorithm, by default, reads the strings from left to right.
 *
 * @class Range
 */
class Range {
  private positionIds: any;

  private seqIds: any;

  private collections: any;

  private posRanges: any;

  /** Create a range
   * @param {TTokens} tokens - tokens generated with {@link Token}
   * @param {TPositions} positions - positions generated with {@link Position}
   */
  constructor(public tokens: TTokens, public positions: TPositions) {
    this.tokens = tokens;
    this.positions = positions;
  }

  get ranges(): TRanges {
    this.getPositionIds();
    this.makeSequentialIds();
    this.generateCollections();
    this.createPositionRanges();
    return this.posRanges;
  }

  private createPositionRanges(): void {
    const posRanges: any = Object.values({ ...this.positions });
    const objKeys = Object.keys(posRanges[0]);
    Object.entries(posRanges).forEach((outRange: any) => {
      const [key, value] = outRange;
      objKeys.forEach((objKey: string) => {
        const elem = value[objKey];
        let res;
        if (Array.isArray(elem)) {
          res = elem.map((id: number) => this.collections[id]);
        } else {
          res = this.collections[elem];
        }
        posRanges[key][objKey] = res;
      });
    });
    this.posRanges = posRanges;
  }

  private generateCollections(): void {
    const collections: any = {};
    let pivotIndex = 0;

    this.seqIds.forEach((seqId: number) => {
      const token = this.tokens[seqId];
      const tokenLength = token.length;
      if (this.positionIds.includes(seqId)) {
        const range = Range.getRange(pivotIndex, tokenLength);
        collections[seqId] = range;
      }
      pivotIndex += tokenLength;
    });

    this.collections = collections;
  }

  private makeSequentialIds(): void {
    const maxId = Math.max(...this.positionIds);
    const seqIds = Utils.seq(0, maxId);
    this.seqIds = seqIds;
  }

  private getPositionIds(): void {
    const arrIds = this.positions.map((position: any) =>
      Object.values(position),
    );
    const positionIds = arrIds.flat(2) as number[];
    this.positionIds = positionIds;
  }

  private static getRange(pivotIndex: number, tokenLength: number): number[] {
    const rangeLeft = pivotIndex;
    const rangeRight = pivotIndex + tokenLength;
    const range = [rangeLeft, rangeRight];
    return range;
  }
}

export { Range };
