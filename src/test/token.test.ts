import Token from "../token";

describe("test Token", () => {
  const text = "\nThe              quick brown fox jumps over the lazy dog.\n";
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
