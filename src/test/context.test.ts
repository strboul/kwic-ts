import { Context } from "../context";

describe("test Context", () => {
  test("get positions and matches", () => {
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

    const { positions, matches } = new Context(tokens, "bottles", 3, 3);

    const expectedPositions = [
      { index: 3, left: [1], right: [5, 7, 9] },
      { index: 17, left: [11, 13, 15], right: [19, 21, 23] },
      { index: 37, left: [31, 33, 35], right: [39, 41, 43] },
    ];
    expect(positions).toStrictEqual(expectedPositions);

    const expectedMatches = [
      {
        index: "bottles",
        left: ["99"],
        right: ["of", "beer", "on"],
      },
      {
        index: "bottles",
        left: ["the", "wall,", "99"],
        right: ["of", "beer.", "Take"],
      },
      {
        index: "bottles",
        left: ["it", "around,", "98"],
        right: ["of", "beer", "on"],
      },
    ];
    expect(matches).toStrictEqual(expectedMatches);
  });

  test("term is a regex pattern", () => {
    const tokens = [
      "One",
      "   ",
      "night",
      "  ",
      "when",
      " ",
      "I",
      " ",
      "was",
      " ",
      "frisky.",
      "  ",
      "Over",
      " ",
      "some",
      " ",
      "potent",
      " ",
      "whisky.",
      " ",
      "Like",
      " ",
      "waves",
      "    ",
      "of",
      " ",
      "the",
      " ",
      "Bay",
      "  ",
      "of",
      " ",
      "Biscay.",
      " ",
      "I",
      " ",
      "began",
      " ",
      "to",
      "   ",
      "tumble",
      " ",
      "and",
      "     ",
      "roar.",
    ];

    const { positions, matches } = new Context(tokens, "[fri|whi]sky", 3, 3);

    const expectedPositions = [
      { index: 10, left: [4, 6, 8], right: [12, 14, 16] },
      { index: 18, left: [12, 14, 16], right: [20, 22, 24] },
    ];
    expect(positions).toStrictEqual(expectedPositions);

    const expectedMatches = [
      {
        index: "frisky.",
        left: ["when", "I", "was"],
        right: ["Over", "some", "potent"],
      },
      {
        index: "whisky.",
        left: ["Over", "some", "potent"],
        right: ["Like", "waves", "of"],
      },
    ];
    expect(matches).toStrictEqual(expectedMatches);
  });

  test("test the corners - when the term first or last token", () => {
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

    const { positions, matches } = new Context(tokens, "[F|f]ox", 3, 3);

    const expectedPositions = [
      { index: 0, left: [], right: [2, 4, 6] },
      { index: 10, left: [4, 6, 8], right: [] },
    ];
    expect(positions).toStrictEqual(expectedPositions);

    const expectedMatches = [
      { index: "Fox", left: [], right: ["said:", "I", "am"] },
      {
        index: "fox.",
        left: ["I", "am", "a"],
        right: [],
      },
    ];
    expect(matches).toStrictEqual(expectedMatches);
  });
});
