import { Kwic } from "@src/kwic";

describe("test Kwic class", () => {
  const text = `
Element: Hydrogen is the chemical element with the symbol H and atomic number
1. With a standard atomic weight of 1.008, hydrogen is the lightest element
in the periodic table. Hydrogen is the most abundant chemical substance in
the universe, constituting roughly 75% of all baryonic mass.[note 1]
Non-remnant stars are mainly composed of hydrogen in the plasma state. The
most common isotope of hydrogen, termed protium (name rarely used, symbol
1H), has one proton and no neutrons.

Source: Wikipedia.org

They are the elements.
`;
  const term = "[e|E]lement";
  const kwic = new Kwic(text, term, [3, 3]);

  test("initialized has the correct fields", () => {
    expect(Object.keys(kwic)).toStrictEqual([
      "text",
      "term",
      "windows",
      "windowLeft",
      "windowRight",
    ]);
  });

  const positions = kwic.getPositions();
  const matches = kwic.getMatches();
  const ranges = kwic.getRanges();

  test("positions and matches have the same length", () => {
    expect(Object.keys(positions).length).toBe(4);
    expect(Object.keys(positions).length).toStrictEqual(
      Object.keys(matches).length,
    );
  });

  test("positions", () => {
    expect(positions).toStrictEqual([
      { index: 1, left: [], right: [3, 5, 7] },
      { index: 11, left: [5, 7, 9], right: [13, 15, 17] },
      { index: 51, left: [45, 47, 49], right: [53, 55, 57] },
      { index: 167, left: [161, 163, 165], right: [] },
    ]);
  });

  test("matches", () => {
    expect(matches).toStrictEqual([
      {
        index: "Element:",
        left: [],
        right: ["Hydrogen", "is", "the"],
      },
      {
        index: "element",
        left: ["is", "the", "chemical"],
        right: ["with", "the", "symbol"],
      },
      {
        index: "element",
        left: ["is", "the", "lightest"],
        right: ["in", "the", "periodic"],
      },
      {
        index: "elements.",
        left: ["They", "are", "the"],
        right: [],
      },
    ]);
  });

  test("ranges", () => {
    expect(ranges).toStrictEqual([
      {
        index: [1, 9],
        left: [],
        right: [
          [10, 18],
          [19, 21],
          [22, 25],
        ],
      },
      {
        index: [35, 42],
        left: [
          [19, 21],
          [22, 25],
          [26, 34],
        ],
        right: [
          [43, 47],
          [48, 51],
          [52, 58],
        ],
      },
      {
        index: [147, 154],
        left: [
          [131, 133],
          [134, 137],
          [138, 146],
        ],
        right: [
          [155, 157],
          [158, 161],
          [162, 170],
        ],
      },
      {
        index: [522, 531],
        left: [
          [509, 513],
          [514, 517],
          [518, 521],
        ],
        right: [],
      },
    ]);
  });
});

describe("text or term is not truthy", () => {
  test("term is not matched in the text", () => {
    const text = "The quick brown fox jumps over the lazy dog.";
    const kwic = new Kwic(text, "lion", [3, 3]);
    expect(kwic.getPositions()).toStrictEqual([]);
    expect(kwic.getMatches()).toStrictEqual([]);
    expect(kwic.getRanges()).toStrictEqual([]);
  });

  test("text is an empty string", () => {
    const kwic = new Kwic("", "a", [3, 3]);
    expect(kwic.getPositions()).toStrictEqual([]);
    expect(kwic.getMatches()).toStrictEqual([]);
    expect(kwic.getRanges()).toStrictEqual([]);
  });

  test("term is an empty string", () => {
    const kwic = new Kwic("here", "", [3, 3]);
    expect(kwic.getPositions()).toStrictEqual([]);
    expect(kwic.getMatches()).toStrictEqual([]);
    expect(kwic.getRanges()).toStrictEqual([]);
  });

  test("term is an invalid regular expression", () => {
    const kwic = new Kwic("text", "[", [3, 3]);
    expect(kwic.getPositions()).toStrictEqual([]);
    expect(kwic.getMatches()).toStrictEqual([]);
    expect(kwic.getRanges()).toStrictEqual([]);
  });
});
