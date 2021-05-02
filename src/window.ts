import Utils from "./utils";
import MathMethod from "./mathMethod";

class Window {
  id!: number;

  constructor(
    public windowLeft: number,
    public windowRight: number,
    public max: number,
    public min: number = 0
  ) {
    this.windowLeft = windowLeft;
    this.windowRight = windowRight;
    this.max = max;
    this.min = min;
  }

  private validate() {
    if (this.min < 0) {
      throw new RangeError("'min' cannot be smaller than 0");
    }
    if (this.id > this.max || this.id < this.min) {
      throw new RangeError("'id' must be between 'min' and 'max'");
    }
    if (this.windowLeft < 0 || this.windowRight < 0) {
      throw new RangeError(
        "'windowLeft' and/or 'windowRight' cannot be smaller than 0"
      );
    }
  }

  getWindowIdx(id: number) {
    this.id = id;
    this.validate();
    const leftIdx = this.getLeftWindowIdx();
    const rightIdx = this.getRightWindowIdx();
    return { leftIdx, rightIdx };
  }

  private getLeftWindowIdx(): number[] | null {
    const buffer: number = this.calcBuffer(this.windowLeft, MathMethod.minus);
    const winId = this.calcWinId(buffer, this.min, MathMethod.isSmallerThan);
    if (winId === null) {
      return [];
    }
    const winSeq = Utils.seq(winId, this.id - 1);
    return winSeq;
  }

  private getRightWindowIdx() {
    const buffer: number = this.calcBuffer(this.windowRight, MathMethod.plus);
    const winId = this.calcWinId(buffer, this.max, MathMethod.isGreaterThan);
    if (winId === null) {
      return [];
    }
    const winSeq = Utils.seq(this.id + 1, winId);
    return winSeq;
  }

  private calcBuffer(window: number, operator: Function) {
    return operator(this.id, window);
  }

  private calcWinId(
    buffer: number,
    boundary: number,
    operator: Function
  ): number | null {
    if (this.id === boundary) {
      return null;
    }
    if (operator(buffer, boundary)) {
      return boundary;
    } else {
      return buffer;
    }
  }
}

export default Window;
