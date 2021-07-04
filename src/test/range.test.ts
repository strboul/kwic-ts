import Range from "../range";

describe("test Range", () => {
  test("when from < to", () => {
    const tokens = [
      "99",
      "bottles",
      "of",
      "beer",
      "on",
      "the",
      "wall,",
      "99",
      "bottles",
      "of",
      "beer.",
      "Take",
      "one",
      "down,",
      "pass",
      "it",
      "around,",
      "98",
      "bottles",
      "of",
      "beer",
      "on",
      "the",
      "wall...",
    ];
    const positions = [
      { index: 1, leftIdx: [0], rightIdx: [2, 3, 4] },
      { index: 8, leftIdx: [5, 6, 7], rightIdx: [9, 10, 11] },
      { index: 18, leftIdx: [15, 16, 17], rightIdx: [19, 20, 21] },
    ];
    const range = new Range(tokens, positions);

    expect(range.getRanges()).toStrictEqual([
      {
        index: [3, 9],
        left: [[0, 2]],
        right: [
          [11, 13],
          [14, 18],
          [19, 21],
        ],
      },
      {
        index: [35, 41],
        left: [
          [22, 25],
          [26, 31],
          [32, 34],
        ],
        right: [
          [43, 45],
          [46, 51],
          [52, 56],
        ],
      },
      {
        index: [86, 92],
        left: [
          [72, 74],
          [75, 82],
          [83, 85],
        ],
        right: [
          [94, 96],
          [97, 101],
          [102, 104],
        ],
      },
    ]);
  });

  test("test corners - when right or left idx are empty", () => {
    const tokens = ["Fox", "said:", "I", "am", "a", "fox."];
    const positions = [
      { index: 0, leftIdx: [], rightIdx: [1, 2, 3] },
      { index: 5, leftIdx: [2, 3, 4], rightIdx: [] },
    ];
    const range = new Range(tokens, positions);

    expect(range.getRanges()).toStrictEqual([
      {
        index: [0, 2],
        left: [],
        right: [
          [4, 9],
          [10, 11],
          [12, 14],
        ],
      },
      {
        index: [17, 20],
        left: [
          [10, 11],
          [12, 14],
          [15, 16],
        ],
        right: [],
      },
    ]);
  });
});
