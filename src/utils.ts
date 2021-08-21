class Utils {
  /** Sequence generation
   *
   * @param from the starting value of the sequence
   * @param to the ending value of the sequence
   */
  public static seq(from: number, to: number): number[] {
    const len = Math.abs(to - from) + 1;
    const res = Array.from({ length: len }, (_, i) => {
      return from < to ? i + from : from - i;
    });
    return res;
  }

  /** Sum elements of a numeric array
   *
   * @param arr a numeric array.
   * @returns a number indicating the sum value.
   */
  public static sum(arr: number[]): number {
    if (arr.length === 0) return 0;
    return arr.reduce((prev: number, curr: number) => prev + curr);
  }

  public static isObjectEmpty(obj: any): boolean {
    return obj.length === 0;
  }

  public static isStringEmpty = (str: string): boolean => {
    return /^\s*$/.test(str);
  };
}

export { Utils };
