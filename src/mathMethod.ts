/** Binary operators are turned into methods in order to pass them as a e.g.
 * method argument
 */
class MathMethod {
  public static plus(x: number, y: number): number {
    return x + y;
  }

  public static minus(x: number, y: number): number {
    return x - y;
  }

  public static isSmallerThan(x: number, y: number): boolean {
    return x < y;
  }

  public static isGreaterThan(x: number, y: number): boolean {
    return x > y;
  }
}

export default MathMethod;
