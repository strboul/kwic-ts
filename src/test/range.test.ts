import Range from "../range";
import { getRangeText } from "./helpers";

describe("test Range when from < to", () => {
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
    { index: 1, left: [0], right: [2, 3, 4] },
    { index: 8, left: [5, 6, 7], right: [9, 10, 11] },
    { index: 18, left: [15, 16, 17], right: [19, 20, 21] },
  ];
  const { ranges } = new Range(tokens, positions);

  const expectedRanges = [
    {
      index: [3, 10],
      left: [[0, 2]],
      right: [
        [11, 13],
        [14, 18],
        [19, 21],
      ],
    },
    {
      index: [35, 42],
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
      index: [86, 93],
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
  ];

  test("get ranges", () => {
    expect(ranges).toStrictEqual(expectedRanges);
  });

  test("strings from ranges", () => {
    const text = tokens.join(" ");

    expect(getRangeText(text, ranges, 0, "index")).toEqual("bottles");
    expect(getRangeText(text, ranges, 0, "left", 0)).toEqual("99");
    expect(getRangeText(text, ranges, 0, "right", 0)).toEqual("of");
    expect(getRangeText(text, ranges, 0, "right", 1)).toEqual("beer");
    expect(getRangeText(text, ranges, 0, "right", 2)).toEqual("on");

    expect(getRangeText(text, ranges, 1, "index")).toEqual("bottles");
    expect(getRangeText(text, ranges, 1, "left", 0)).toEqual("the");
    expect(getRangeText(text, ranges, 1, "left", 1)).toEqual("wall,");
    expect(getRangeText(text, ranges, 1, "left", 2)).toEqual("99");
    expect(getRangeText(text, ranges, 1, "right", 0)).toEqual("of");
    expect(getRangeText(text, ranges, 1, "right", 1)).toEqual("beer.");
    expect(getRangeText(text, ranges, 1, "right", 2)).toEqual("Take");

    expect(getRangeText(text, ranges, 2, "index")).toEqual("bottles");
    expect(getRangeText(text, ranges, 2, "left", 0)).toEqual("it");
    expect(getRangeText(text, ranges, 2, "left", 1)).toEqual("around,");
    expect(getRangeText(text, ranges, 2, "left", 2)).toEqual("98");
    expect(getRangeText(text, ranges, 2, "right", 0)).toEqual("of");
    expect(getRangeText(text, ranges, 2, "right", 1)).toEqual("beer");
    expect(getRangeText(text, ranges, 2, "right", 2)).toEqual("on");
  });
});

describe("when right or left idx are empty", () => {
  const tokens = ["Fox", "said:", "I", "am", "a", "fox."];
  const positions = [
    { index: 0, left: [], right: [1, 2, 3] },
    { index: 5, left: [2, 3, 4], right: [] },
  ];
  const { ranges } = new Range(tokens, positions);

  const expectedRanges = [
    {
      index: [0, 3],
      left: [],
      right: [
        [4, 9],
        [10, 11],
        [12, 14],
      ],
    },
    {
      index: [17, 21],
      left: [
        [10, 11],
        [12, 14],
        [15, 16],
      ],
      right: [],
    },
  ];

  test("get ranges", () => {
    expect(ranges).toStrictEqual(expectedRanges);
  });

  test("strings from ranges", () => {
    const text = tokens.join(" ");

    expect(getRangeText(text, ranges, 0, "index")).toEqual("Fox");
    expect(getRangeText(text, ranges, 0, "right", 0)).toEqual("said:");
    expect(getRangeText(text, ranges, 0, "right", 1)).toEqual("I");
    expect(getRangeText(text, ranges, 0, "right", 2)).toEqual("am");

    expect(getRangeText(text, ranges, 1, "index")).toEqual("fox.");
    expect(getRangeText(text, ranges, 1, "left", 0)).toEqual("I");
    expect(getRangeText(text, ranges, 1, "left", 1)).toEqual("am");
    expect(getRangeText(text, ranges, 1, "left", 2)).toEqual("a");
  });
});
