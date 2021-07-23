import Position from "../position";
import Match from "../match";

describe("test Position and Match", () => {
  test("get positions and matches", () => {
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

    const { positions } = new Position(tokens, "bottles", [3, 3]);

    const expectedPositions = [
      { index: 1, left: [0], right: [2, 3, 4] },
      { index: 8, left: [5, 6, 7], right: [9, 10, 11] },
      { index: 18, left: [15, 16, 17], right: [19, 20, 21] },
    ];
    expect(positions).toStrictEqual(expectedPositions);

    const { matches } = new Match(tokens, positions);

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
      "night",
      "when",
      "I",
      "was",
      "frisky.",
      "Over",
      "some",
      "potent",
      "whisky.",
      "Like",
      "waves",
      "of",
      "the",
      "Bay",
      "of",
      "Biscay.",
      "I",
      "began",
      "to",
      "tumble",
      "and",
      "roar.",
    ];

    const { positions } = new Position(tokens, "[fri|whi]sky", [3, 3]);

    const expectedPositions = [
      { index: 5, left: [2, 3, 4], right: [6, 7, 8] },
      { index: 9, left: [6, 7, 8], right: [10, 11, 12] },
    ];
    expect(positions).toStrictEqual(expectedPositions);

    const { matches } = new Match(tokens, positions);

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
    const tokens = ["Fox", "said:", "I", "am", "a", "fox."];

    const { positions } = new Position(tokens, "[F|f]ox", [3, 3]);

    const expectedPositions = [
      { index: 0, left: [], right: [1, 2, 3] },
      { index: 5, left: [2, 3, 4], right: [] },
    ];
    expect(positions).toStrictEqual(expectedPositions);

    const { matches } = new Match(tokens, positions);

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
