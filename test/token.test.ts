import Token from "../src/token";

describe("test Token", () => {
  const text = "The quick brown fox jumps over the lazy dog.";
  const token = new Token(text);

  test("tokenize text", () => {
    expect(token.tokenize()).toStrictEqual([
      "The",
      "quick",
      "brown",
      "fox",
      "jumps",
      "over",
      "the",
      "lazy",
      "dog.",
    ]);
  });
});
