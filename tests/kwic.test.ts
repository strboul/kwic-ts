import Kwic from "../src/kwic";

import { readFileSync } from "fs";

const text = readFileSync("./tests/text.txt", "utf-8");

describe("test Kwic object", () => {
  test("can Kwic be initialized", () => {
    expect(3).toBe(3);

    const kwic = new Kwic(text, "[e|E]lement");
    kwic.locate();
  });
});

