import { Window } from "@src/window";

const tokens = ["a", "b", "", "c", "d", "", "", "e", "f", "", "", "g"];

describe("test Window", () => {
  test("id in the middle", () => {
    const { windows } = new Window(3, 3, tokens, 3);
    expect(windows).toStrictEqual({
      index: 3,
      left: [0, 1],
      right: [4, 7, 8],
    });
  });

  test("id close to the left", () => {
    const { windows } = new Window(3, 3, tokens, 1);
    expect(windows).toStrictEqual({
      index: 1,
      left: [0],
      right: [3, 4, 7],
    });
  });

  test("id close to the right", () => {
    const { windows } = new Window(3, 3, tokens, 8);
    expect(windows).toStrictEqual({
      index: 8,
      left: [3, 4, 7],
      right: [11],
    });
  });

  test("id equals to the min", () => {
    const { windows } = new Window(3, 3, tokens, 0);
    expect(windows).toStrictEqual({ index: 0, left: [], right: [1, 3, 4] });
  });

  test("id equals to the max", () => {
    const { windows } = new Window(3, 3, tokens, 11);
    expect(windows).toStrictEqual({ index: 11, left: [4, 7, 8], right: [] });
  });
});

describe("test Window with unbalanced windows", () => {
  test("id in the middle", () => {
    const { windows } = new Window(1, 5, tokens, 3);
    expect(windows).toStrictEqual({
      index: 3,
      left: [1],
      right: [4, 7, 8, 11],
    });
  });

  test("id close to the left", () => {
    const { windows } = new Window(3, 3, tokens, 1);
    expect(windows).toStrictEqual({ index: 1, left: [0], right: [3, 4, 7] });
  });

  test("id close to the right", () => {
    const { windows } = new Window(3, 3, tokens, 8);
    expect(windows).toStrictEqual({
      index: 8,
      left: [3, 4, 7],
      right: [11],
    });
  });

  test("id equals to the min", () => {
    const { windows } = new Window(3, 3, tokens, 0);
    expect(windows).toStrictEqual({ index: 0, left: [], right: [1, 3, 4] });
  });

  test("id equals to the max", () => {
    const { windows } = new Window(3, 3, tokens, 11);
    expect(windows).toStrictEqual({ index: 11, left: [4, 7, 8], right: [] });
  });
});

describe("test Window with zero values", () => {
  test("when left window is zero", () => {
    const { windows } = new Window(0, 3, tokens, 1);
    expect(windows).toStrictEqual({ index: 1, left: [], right: [3, 4, 7] });
  });

  test("when right window is zero", () => {
    const { windows } = new Window(3, 0, tokens, 1);
    expect(windows).toStrictEqual({ index: 1, left: [0], right: [] });
  });

  test("when both window is zero", () => {
    const { windows } = new Window(0, 0, tokens, 1);
    expect(windows).toStrictEqual({ index: 1, left: [], right: [] });
  });
});

describe("input parameter validations", () => {
  test("min range", () => {
    expect(() => new Window(3, 3, [], 1).windows).toThrowError(
      "'index' cannot be higher than tokens length",
    );
  });

  test("id range", () => {
    expect(() => new Window(3, 3, [], -1).windows).toThrowError(
      "'index' cannot be lower than 0",
    );
  });

  test("window range", () => {
    expect(() => new Window(-1, 3, [], 0).windows).toThrowError(
      "window values cannot be smaller than 0",
    );
  });
});
