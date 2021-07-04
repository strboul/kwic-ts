import Window from "../window";

describe("test Window", () => {
  const window = new Window([3, 3], 25);

  test("id in the middle", () => {
    expect(window.getWindowIdx(5)).toEqual({
      index: 5,
      leftIdx: [2, 3, 4],
      rightIdx: [6, 7, 8],
    });
  });

  test("id close to the left", () => {
    expect(window.getWindowIdx(1)).toEqual({
      index: 1,
      leftIdx: [0],
      rightIdx: [2, 3, 4],
    });
  });

  test("id close to the right", () => {
    expect(window.getWindowIdx(24)).toEqual({
      index: 24,
      leftIdx: [21, 22, 23],
      rightIdx: [25],
    });
  });

  test("id equals to the min", () => {
    expect(window.getWindowIdx(0)).toEqual({
      index: 0,
      leftIdx: [],
      rightIdx: [1, 2, 3],
    });
  });

  test("id equals to the max", () => {
    expect(window.getWindowIdx(25)).toEqual({
      index: 25,
      leftIdx: [22, 23, 24],
      rightIdx: [],
    });
  });
});

describe("test Window with unbalanced windows", () => {
  const window = new Window([1, 5], 10);

  test("id in the middle", () => {
    expect(window.getWindowIdx(4)).toEqual({
      index: 4,
      leftIdx: [3],
      rightIdx: [5, 6, 7, 8, 9],
    });
  });

  test("id close to the left", () => {
    expect(window.getWindowIdx(2)).toEqual({
      index: 2,
      leftIdx: [1],
      rightIdx: [3, 4, 5, 6, 7],
    });
  });

  test("id close to the right", () => {
    expect(window.getWindowIdx(7)).toEqual({
      index: 7,
      leftIdx: [6],
      rightIdx: [8, 9, 10],
    });
  });

  test("id equals to the min", () => {
    expect(window.getWindowIdx(0)).toEqual({
      index: 0,
      leftIdx: [],
      rightIdx: [1, 2, 3, 4, 5],
    });
  });

  test("id equals to the max", () => {
    expect(window.getWindowIdx(10)).toEqual({
      index: 10,
      leftIdx: [9],
      rightIdx: [],
    });
  });
});

describe("input parameter validations", () => {
  test("min range", () => {
    expect(() => new Window([3, 3], 10, -1).getWindowIdx(0)).toThrowError(
      "'min' cannot be smaller than 0",
    );
  });

  test("id range", () => {
    expect(() => new Window([3, 3], 10).getWindowIdx(25)).toThrowError(
      "'id' must be between 'min' and 'max'",
    );
  });

  test("window range", () => {
    expect(() => new Window([-1, 3], 10).getWindowIdx(0)).toThrowError(
      "'windows' values cannot be smaller than 0",
    );
  });
});
