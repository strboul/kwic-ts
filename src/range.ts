import { Utils } from "@src/utils";
import { TPositions, TPositionsObj } from "@src/context";
import { TTokens } from "@src/token";
import { IBaseOutput, IBaseElement } from "@src/IBase";

/** Interface fakes a tuple that it cannot have more than 2 elements
 */
interface IRangesTuple {
  0: number;
  1: number;
  2?: never;
}

type TRangesTupleGroup = IBaseOutput<IRangesTuple>;
type TRangesObjRange = IBaseElement<IRangesTuple, TRangesTupleGroup>;

export type TRanges = IBaseOutput<TRangesObjRange>;

/** Range of strings
 *
 * The Range algorithm, by default, reads the strings from left to right.
 *
 * @class Range
 */
class Range {
  private positionIds!: number[];

  private sequentialIds!: number[];

  private collections: any;

  private positionRanges: any;

  /** Create a range
   * @param {TTokens} tokens - tokens generated with {@link Token}
   * @param {TPositions} positions - positions generated with {@link Position}
   */
  constructor(public tokens: TTokens, public positions: TPositions) {
    this.tokens = tokens;
    this.positions = positions;
  }

  get ranges(): TRanges {
    this.setPositionIds();
    this.createSequentialIds();
    this.setCollections();
    this.calcPositionRanges();
    return this.positionRanges;
  }

  private calcPositionRanges(): void {
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
    this.positionRanges = posRanges;
  }

  private setCollections(): void {
    const collections: any = {};
    let pivotIndex: number = 0;

    this.sequentialIds.forEach((seqId: number) => {
      const token: string = this.tokens[seqId];
      const tokenLength: number = token.length;
      const hasSeqId: boolean = this.positionIds.includes(seqId);
      if (hasSeqId) {
        const range: number[] = Range.getRange(pivotIndex, tokenLength);
        collections[seqId] = range;
      }
      pivotIndex += tokenLength;
    });

    this.collections = collections;
  }

  private createSequentialIds(): void {
    const maxId: number = Math.max(...this.positionIds);
    const seqIds: number[] = Utils.seq(0, maxId);
    this.sequentialIds = seqIds;
  }

  private setPositionIds(): void {
    const arrIds: number[] = this.positions.map((position: TPositionsObj) =>
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
