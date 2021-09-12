import { Utils } from "@src/utils";
import { TTokens } from "@src/token";
import { IBaseObject } from "@src/IBase";

export type TWindowElement = number[] | [];
export type TWindow = IBaseObject<number, TWindowElement>;

class Window {
  max: number;

  left!: TWindowElement;

  right!: TWindowElement;

  constructor(
    public windowLeft: number,
    public windowRight: number,
    public tokens: TTokens,
    public index: number,
  ) {
    this.windowLeft = windowLeft;
    this.windowRight = windowRight;
    this.tokens = tokens;
    this.index = index;
    this.max = this.tokens.length;
    this.validateInput();
  }

  get windows(): TWindow {
    this.setLeftWindow();
    this.setRightWindow();
    const { index, left, right } = this;
    return { index, left, right };
  }

  private validateInput(): void {
    if (this.index > this.max) {
      throw new RangeError("'index' cannot be higher than tokens length");
    }
    if (this.index < 0) {
      throw new RangeError("'index' cannot be lower than 0");
    }
    if (this.windowLeft < 0 || this.windowRight < 0) {
      throw new RangeError("window values cannot be smaller than 0");
    }
  }

  private setLeftWindow(): void {
    let pivot: number = this.index - 1;
    let left: TWindowElement = [];
    while (left.length < this.windowLeft && pivot >= 0) {
      const isEmptyToken: boolean = this.isEmptyToken(pivot);
      if (!isEmptyToken) {
        left = [pivot, ...left];
      }
      pivot -= 1;
    }
    this.left = left;
  }

  private setRightWindow(): void {
    let pivot: number = this.index + 1;
    let right: TWindowElement = [];
    while (right.length < this.windowRight && pivot < this.max) {
      const isEmptyToken: boolean = this.isEmptyToken(pivot);
      if (!isEmptyToken) {
        right = [...right, pivot];
      }
      pivot += 1;
    }
    this.right = right;
  }

  private isEmptyToken(pivot: number): boolean {
    const token = this.tokens[pivot];
    const isEmpty: boolean = Utils.isStringEmpty(token);
    return isEmpty;
  }
}

export { Window };
