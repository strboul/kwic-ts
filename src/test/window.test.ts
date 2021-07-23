import Window from "../window";

describe("test Window", () => {
  const window = new Window([3, 3], 25);

  test("id in the middle", () => {
    expect(window.getWindows(5)).toEqual({
      index: 5,
      left: [2, 3, 4],
      right: [6, 7, 8],
    });
  });

  test("id close to the left", () => {
    expect(window.getWindows(1)).toEqual({
      index: 1,
      left: [0],
      right: [2, 3, 4],
    });
  });

  test("id close to the right", () => {
    expect(window.getWindows(24)).toEqual({
      index: 24,
      left: [21, 22, 23],
      right: [25],
    });
  });

  test("id equals to the min", () => {
    expect(window.getWindows(0)).toEqual({
      index: 0,
      left: [],
      right: [1, 2, 3],
    });
  });

  test("id equals to the max", () => {
    expect(window.getWindows(25)).toEqual({
      index: 25,
      left: [22, 23, 24],
      right: [],
    });
  });
});

describe("test Window with unbalanced windows", () => {
  const window = new Window([1, 5], 10);

  test("id in the middle", () => {
    expect(window.getWindows(4)).toEqual({
      index: 4,
      left: [3],
      right: [5, 6, 7, 8, 9],
    });
  });

  test("id close to the left", () => {
    expect(window.getWindows(2)).toEqual({
      index: 2,
      left: [1],
      right: [3, 4, 5, 6, 7],
    });
  });

  test("id close to the right", () => {
    expect(window.getWindows(7)).toEqual({
      index: 7,
      left: [6],
      right: [8, 9, 10],
    });
  });

  test("id equals to the min", () => {
    expect(window.getWindows(0)).toEqual({
      index: 0,
      left: [],
      right: [1, 2, 3, 4, 5],
    });
  });

  test("id equals to the max", () => {
    expect(window.getWindows(10)).toEqual({
      index: 10,
      left: [9],
      right: [],
    });
  });
});

describe("test Window with zero values", () => {
  test("when left is zero", () => {
    expect(new Window([0, 3], 10).getWindows(5)).toStrictEqual({
      index: 5,
      left: [],
      right: [6, 7, 8],
    });
  });

  test("when right is zero", () => {
    expect(new Window([3, 0], 10).getWindows(5)).toStrictEqual({
      index: 5,
      left: [2, 3, 4],
      right: [],
    });
  });

  test("when both is zero", () => {
    expect(new Window([0, 0], 10).getWindows(5)).toStrictEqual({
      index: 5,
      left: [],
      right: [],
    });
  });
});

describe("input parameter validations", () => {
  test("min range", () => {
    expect(() => new Window([3, 3], 10, -1).getWindows(0)).toThrowError(
      "'min' cannot be smaller than 0",
    );
  });

  test("id range", () => {
    expect(() => new Window([3, 3], 10).getWindows(25)).toThrowError(
      "'id' must be between 'min' and 'max'",
    );
  });

  test("window range", () => {
    expect(() => new Window([-1, 3], 10).getWindows(0)).toThrowError(
      "'windows' values cannot be smaller than 0",
    );
  });
});
