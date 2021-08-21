import { Utils } from "../utils";

describe("test seq", () => {
  test("when from < to", () => {
    expect(Utils.seq(1, 5)).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test("when from > to", () => {
    expect(Utils.seq(5, 1)).toStrictEqual([5, 4, 3, 2, 1]);
  });

  test("when from = to", () => {
    expect(Utils.seq(2, 2)).toStrictEqual([2]);
  });
});

describe("test sum", () => {
  test("simple array", () => {
    expect(Utils.sum([1, 2, 3, 4])).toEqual(10);
  });

  test("empty array input returns zero", () => {
    expect(Utils.sum([])).toEqual(0);
  });
});

describe("test isObjectEmpty", () => {
  test("object is empty", () => {
    expect(Utils.isObjectEmpty([])).toBe(true);
  });
});

describe("test isStringEmpty", () => {
  test("string is zero length", () => {
    expect(Utils.isStringEmpty("")).toBe(true);
  });

  test("string has spaces", () => {
    expect(Utils.isStringEmpty("   ")).toBe(true);
  });

  test("string is with a character", () => {
    expect(Utils.isStringEmpty("  a")).toBe(false);
  });
});
