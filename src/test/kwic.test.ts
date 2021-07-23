import Kwic from "../kwic";

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
  const kwic = new Kwic(text, term);

  test("initialized has the correct fields", () => {
    expect(Object.keys(kwic)).toStrictEqual([
      "text",
      "term",
      "windows",
      "positions",
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
      { index: 0, left: [], right: [1, 2, 3] },
      { index: 5, left: [2, 3, 4], right: [6, 7, 8] },
      { index: 25, left: [22, 23, 24], right: [26, 27, 28] },
      { index: 83, left: [80, 81, 82], right: [] },
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
        index: [0, 8],
        left: [],
        right: [
          [9, 17],
          [18, 20],
          [21, 24],
        ],
      },
      {
        index: [34, 41],
        left: [
          [18, 20],
          [21, 24],
          [25, 33],
        ],
        right: [
          [42, 46],
          [47, 50],
          [51, 57],
        ],
      },
      {
        index: [146, 153],
        left: [
          [130, 132],
          [133, 136],
          [137, 145],
        ],
        right: [
          [154, 156],
          [157, 160],
          [161, 169],
        ],
      },
      {
        index: [519, 528],
        left: [
          [506, 510],
          [511, 514],
          [515, 518],
        ],
        right: [],
      },
    ]);
  });
});

describe("text or term is not truthy", () => {
  test("term is not matched in the text", () => {
    const text = "The quick brown fox jumps over the lazy dog.";
    const kwic = new Kwic(text, "lion");
    expect(kwic.getPositions()).toStrictEqual([]);
    expect(kwic.getMatches()).toStrictEqual([]);
    expect(kwic.getRanges()).toStrictEqual([]);
  });

  test("text is an empty string", () => {
    const kwic = new Kwic("", "a");
    expect(kwic.getPositions()).toStrictEqual([]);
    expect(kwic.getMatches()).toStrictEqual([]);
    expect(kwic.getRanges()).toStrictEqual([]);
  });

  test("term is an empty string", () => {
    const kwic = new Kwic("here", "");
    expect(kwic.getPositions()).toStrictEqual([]);
    expect(kwic.getMatches()).toStrictEqual([]);
    expect(kwic.getRanges()).toStrictEqual([]);
  });
});
