import Context from "../src/context";

describe("test Context", () => {
  test("get matches and positions of the tokens", () => {
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
    const context = new Context(tokens, "bottles", 3, 3);
    const contexted = context.getContext();

    expect(contexted.positions).toStrictEqual([
      { index: 1, leftIdx: [0], rightIdx: [2, 3, 4] },
      { index: 8, leftIdx: [5, 6, 7], rightIdx: [9, 10, 11] },
      { index: 18, leftIdx: [15, 16, 17], rightIdx: [19, 20, 21] },
    ]);

    expect(contexted.matches).toStrictEqual([
      {
        index: "bottles",
        leftIdx: ["99"],
        rightIdx: ["of", "beer", "on"],
      },
      {
        index: "bottles",
        leftIdx: ["the", "wall,", "99"],
        rightIdx: ["of", "beer.", "Take"],
      },
      {
        index: "bottles",
        leftIdx: ["it", "around,", "98"],
        rightIdx: ["of", "beer", "on"],
      },
    ]);
  });

  test("term is a regex pattern", () => {
    const tokensLyrics = [
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
    const context = new Context(tokensLyrics, "[fri|whi]sky", 3, 3);
    const contexted = context.getContext();

    expect(contexted.positions).toStrictEqual([
      { index: 5, leftIdx: [2, 3, 4], rightIdx: [6, 7, 8] },
      { index: 9, leftIdx: [6, 7, 8], rightIdx: [10, 11, 12] },
    ]);

    expect(contexted.matches).toStrictEqual([
      {
        index: "frisky.",
        leftIdx: ["when", "I", "was"],
        rightIdx: ["Over", "some", "potent"],
      },
      {
        index: "whisky.",
        leftIdx: ["Over", "some", "potent"],
        rightIdx: ["Like", "waves", "of"],
      },
    ]);
  });

  test("test the corners - when the term first or last token", () => {
    const tokensFox = ["Fox", "said:", "I", "am", "a", "fox."];

    const context = new Context(tokensFox, "[F|f]ox", 3, 3);
    const contexted = context.getContext();

    expect(contexted.positions).toStrictEqual([
      { index: 0, leftIdx: [], rightIdx: [1, 2, 3] },
      { index: 5, leftIdx: [2, 3, 4], rightIdx: [6] },
    ]);

    expect(contexted.matches).toStrictEqual([
      { index: "Fox", leftIdx: [], rightIdx: ["said:", "I", "am"] },
      {
        index: "fox.",
        leftIdx: ["I", "am", "a"],
        rightIdx: [undefined], // TODO fix this
      },
    ]);
  });
});
