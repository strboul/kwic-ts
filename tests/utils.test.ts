import { seq } from "../src/utils";

describe("test seq", () => {
  test("when from < to", () => {
    expect(seq(1, 5)).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test("when from > to", () => {
    expect(seq(5, 1)).toStrictEqual([5, 4, 3, 2, 1]);
  });

  test("when from = to", () => {
    expect(seq(2, 2)).toStrictEqual([2]);
  });
});
