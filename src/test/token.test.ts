import Token from "../token";

describe("test Token", () => {
  const text = "\nThe              quick brown fox jumps over the lazy dog.\n";
  const { tokens } = new Token(text);

  test("tokenize text", () => {
    expect(tokens).toStrictEqual([
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

describe("when text is an empty string", () => {
  const text = "";
  const { tokens } = new Token(text);

  test("tokenize text returns an empty array", () => {
    expect(tokens).toStrictEqual([]);
  });
});
