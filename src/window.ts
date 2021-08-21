import { Utils } from "./utils";
import { TTokens } from "./token";
import { IBaseMethods } from "./IBaseMethods";

type TWinElem = number[] | [];

// TODO use generic types
export interface IWindow extends IBaseMethods {
  index: number;
  left: TWinElem;
  right: TWinElem;
}

class Window {
  max: number;

  left!: TWinElem;

  right!: TWinElem;

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
    this.validate();
  }

  get windows(): IWindow {
    this.setLeftWindow();
    this.setRightWindow();
    const { index, left, right } = this;
    return { index, left, right };
  }

  private validate(): void {
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
    let left: TWinElem = [];
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
    let right: TWinElem = [];
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
