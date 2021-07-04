import Kwic from "../kwic";

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

describe("test Kwic class with the text", () => {
  const kwic = new Kwic(text, "[e|E]lement");

  test("initialization has the correct object", () => {
    expect(Object.keys(kwic)).toStrictEqual(["windows", "text", "term"]);
  });

  const located = kwic.locate();

  test("located positions and matches have the same length", () => {
    expect(Object.keys(located!.positions).length).toBe(4);
    expect(Object.keys(located!.positions).length).toStrictEqual(
      Object.keys(located!.matches).length,
    );
  });

  test("the located positions", () => {
    expect(located!.positions).toStrictEqual([
      { index: 0, leftIdx: [], rightIdx: [1, 2, 3] },
      { index: 5, leftIdx: [2, 3, 4], rightIdx: [6, 7, 8] },
      { index: 25, leftIdx: [22, 23, 24], rightIdx: [26, 27, 28] },
      { index: 83, leftIdx: [80, 81, 82], rightIdx: [] },
    ]);
  });

  test("the located matches", () => {
    expect(located!.matches).toStrictEqual([
      {
        index: "Element:",
        leftIdx: [],
        rightIdx: ["Hydrogen", "is", "the"],
      },
      {
        index: "element",
        leftIdx: ["is", "the", "chemical"],
        rightIdx: ["with", "the", "symbol"],
      },
      {
        index: "element",
        leftIdx: ["is", "the", "lightest"],
        rightIdx: ["in", "the", "periodic"],
      },
      {
        index: "elements.",
        leftIdx: ["They", "are", "the"],
        rightIdx: [],
      },
    ]);
  });
});

describe("if the term doesn't exist, it returns", () => {
  test("returns null", () => {
    const pangram = "The quick brown fox jumps over the lazy dog.";
    const kwic = new Kwic(pangram, "lion");
    expect(kwic.locate()).toStrictEqual([]);
  });
});
