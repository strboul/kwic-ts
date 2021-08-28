import { Token } from "@src/token";

describe("test Token", () => {
  const text = `   99 bottles of     beer on the wall,
  99 bottles of beer.
    Take one down, pass it
  around,   98   bottles   of
  beer on     the  wall...`;
  const { tokens } = new Token(text);

  test("tokenize text", () => {
    expect(tokens).toStrictEqual([
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
    ]);
  });
});

describe("when text is an empty string", () => {
  const text = "";
  const { tokens } = new Token(text);

  test("tokenize text returns an empty array", () => {
    expect(tokens).toStrictEqual([]);
  });
});
