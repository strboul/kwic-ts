import Utils from "./utils";
import MathMethod from "./mathMethod";

type TWinElem = number[] | [];

// TODO use generic types
export interface IWindow {
  index: number;
  left: TWinElem;
  right: TWinElem;
}

class Window {
  id!: number;

  constructor(
    public windows: number[],
    public max: number,
    public min: number = 0,
  ) {
    this.windows = windows;
    this.max = max;
    this.min = min;
  }

  getWindows(id: number): IWindow {
    this.id = id;
    this.validate();
    const left = this.getLeftWindow() as TWinElem;
    const right = this.getRightWindow() as TWinElem;
    return { index: this.id, left, right };
  }

  private validate(): void {
    if (this.min < 0) {
      throw new RangeError("'min' cannot be smaller than 0");
    }
    if (this.id > this.max || this.id < this.min) {
      throw new RangeError("'id' must be between 'min' and 'max'");
    }
    if (this.windows.some((win) => win < 0)) {
      throw new RangeError("'windows' values cannot be smaller than 0");
    }
  }

  private getLeftWindow(): TWinElem {
    const [windowLeft] = this.windows;
    if (windowLeft === 0) return [];

    const buffer: number = this.calcBuffer(windowLeft, MathMethod.minus);
    const winId = this.calcWinId(buffer, this.min, MathMethod.isSmallerThan);
    if (winId === null) return [];

    const winSeq = Utils.seq(winId, this.id - 1);
    return winSeq;
  }

  private getRightWindow(): TWinElem {
    const [, windowRight] = this.windows;
    if (windowRight === 0) return [];

    const buffer: number = this.calcBuffer(windowRight, MathMethod.plus);
    const winId = this.calcWinId(buffer, this.max, MathMethod.isGreaterThan);
    if (winId === null) return [];

    const winSeq = Utils.seq(this.id + 1, winId);
    return winSeq;
  }

  private calcBuffer(window: number, operator: Function) {
    return operator(this.id, window);
  }

  private calcWinId(
    buffer: number,
    boundary: number,
    operator: Function,
  ): number | null {
    if (this.id === boundary) {
      return null;
    }
    if (operator(buffer, boundary)) {
      return boundary;
    }
    return buffer;
  }
}

export default Window;
