import { Range } from "@src/range";
import { getRangeText } from "@src/test/helpers";

describe("test Range when from < to", () => {
  const tokens = [
    "   ",
    "99",
    " ",
    "bottles",
    " ",
    "of",
    "     ",
    "beer",
    " ",
    "on",
    " ",
    "the",
    " ",
    "wall,",
    "   ",
    "99",
    " ",
    "bottles",
    " ",
    "of",
    " ",
    "beer.",
    "     ",
    "Take",
    " ",
    "one",
    " ",
    "down,",
    " ",
    "pass",
    " ",
    "it",
    "   ",
    "around,",
    "   ",
    "98",
    "   ",
    "bottles",
    "   ",
    "of",
    "   ",
    "beer",
    " ",
    "on",
    "     ",
    "the",
    "  ",
    "wall...",
  ];

  const positions = [
    { index: 3, left: [1], right: [5, 7, 9] },
    { index: 17, left: [11, 13, 15], right: [19, 21, 23] },
    { index: 37, left: [31, 33, 35], right: [39, 41, 43] },
  ];
  const { ranges } = new Range(tokens, positions);

  test("get ranges", () => {
    const expectedRanges = [
      {
        index: [6, 13],
        left: [[3, 5]],
        right: [
          [14, 16],
          [21, 25],
          [26, 28],
        ],
      },
      {
        index: [44, 51],
        left: [
          [29, 32],
          [33, 38],
          [41, 43],
        ],
        right: [
          [52, 54],
          [55, 60],
          [65, 69],
        ],
      },
      {
        index: [105, 112],
        left: [
          [85, 87],
          [90, 97],
          [100, 102],
        ],
        right: [
          [115, 117],
          [120, 124],
          [125, 127],
        ],
      },
    ];

    expect(ranges).toStrictEqual(expectedRanges);
  });

  test("strings from ranges", () => {
    const txt = tokens.join("");
    expect(getRangeText(txt, ranges, 0, "index")).toEqual("bottles");
    expect(getRangeText(txt, ranges, 0, "left", 0)).toEqual("99");
    expect(getRangeText(txt, ranges, 0, "right", 0)).toEqual("of");
    expect(getRangeText(txt, ranges, 0, "right", 1)).toEqual("beer");
    expect(getRangeText(txt, ranges, 0, "right", 2)).toEqual("on");

    expect(getRangeText(txt, ranges, 1, "index")).toEqual("bottles");
    expect(getRangeText(txt, ranges, 1, "left", 0)).toEqual("the");
    expect(getRangeText(txt, ranges, 1, "left", 1)).toEqual("wall,");
    expect(getRangeText(txt, ranges, 1, "left", 2)).toEqual("99");
    expect(getRangeText(txt, ranges, 1, "right", 0)).toEqual("of");
    expect(getRangeText(txt, ranges, 1, "right", 1)).toEqual("beer.");
    expect(getRangeText(txt, ranges, 1, "right", 2)).toEqual("Take");

    expect(getRangeText(txt, ranges, 2, "index")).toEqual("bottles");
    expect(getRangeText(txt, ranges, 2, "left", 0)).toEqual("it");
    expect(getRangeText(txt, ranges, 2, "left", 1)).toEqual("around,");
    expect(getRangeText(txt, ranges, 2, "left", 2)).toEqual("98");
    expect(getRangeText(txt, ranges, 2, "right", 0)).toEqual("of");
    expect(getRangeText(txt, ranges, 2, "right", 1)).toEqual("beer");
    expect(getRangeText(txt, ranges, 2, "right", 2)).toEqual("on");
  });
});

describe("when right or left ids are empty", () => {
  const tokens = [
    "Fox",
    " ",
    "said:",
    "  ",
    "I",
    " ",
    "am",
    " ",
    "a",
    "  ",
    "fox.",
  ];
  const positions = [
    { index: 0, left: [], right: [2, 4, 6] },
    { index: 10, left: [4, 6, 8], right: [] },
  ];
  const { ranges } = new Range(tokens, positions);

  test("get ranges", () => {
    const expectedRanges = [
      {
        index: [0, 3],
        left: [],
        right: [
          [4, 9],
          [11, 12],
          [13, 15],
        ],
      },
      {
        index: [19, 23],
        left: [
          [11, 12],
          [13, 15],
          [16, 17],
        ],
        right: [],
      },
    ];
    expect(ranges).toStrictEqual(expectedRanges);
  });

  test("strings from ranges", () => {
    const txt = tokens.join("");
    expect(getRangeText(txt, ranges, 0, "index")).toEqual("Fox");
    expect(getRangeText(txt, ranges, 0, "right", 0)).toEqual("said:");
    expect(getRangeText(txt, ranges, 0, "right", 1)).toEqual("I");
    expect(getRangeText(txt, ranges, 0, "right", 2)).toEqual("am");

    expect(getRangeText(txt, ranges, 1, "index")).toEqual("fox.");
    expect(getRangeText(txt, ranges, 1, "left", 0)).toEqual("I");
    expect(getRangeText(txt, ranges, 1, "left", 1)).toEqual("am");
    expect(getRangeText(txt, ranges, 1, "left", 2)).toEqual("a");
  });
});
