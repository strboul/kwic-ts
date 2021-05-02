import Kwic from "../src/kwic";

import { readFileSync } from "fs";

const text = readFileSync("./test/data/text.txt", "utf-8");

describe("test Kwic class with the text", () => {
  const kwic = new Kwic(text, "[e|E]lement");

  test("initialization has the correct object", () => {
    expect(Object.keys(kwic)).toStrictEqual([
      "windowLeft",
      "windowRight",
      "text",
      "term",
    ]);
  });

  const located = kwic.locate();

  test("located positions and matches have the same length", () => {
    expect(located!.positions.length).toBe(18);
    expect(located!.positions.length).toStrictEqual(located!.matches.length);
  });

  test("the located positions", () => {
    expect(located!.positions).toStrictEqual([
      { index: 0, leftIdx: [], rightIdx: [1, 2, 3] },
      { index: 5, leftIdx: [2, 3, 4], rightIdx: [6, 7, 8] },
      { index: 25, leftIdx: [22, 23, 24], rightIdx: [26, 27, 28] },
      { index: 88, leftIdx: [85, 86, 87], rightIdx: [89, 90, 91] },
      {
        index: 127,
        leftIdx: [124, 125, 126],
        rightIdx: [128, 129, 130],
      },
      {
        index: 137,
        leftIdx: [134, 135, 136],
        rightIdx: [138, 139, 140],
      },
      {
        index: 158,
        leftIdx: [155, 156, 157],
        rightIdx: [159, 160, 161],
      },
      {
        index: 172,
        leftIdx: [169, 170, 171],
        rightIdx: [173, 174, 175],
      },
      {
        index: 207,
        leftIdx: [204, 205, 206],
        rightIdx: [208, 209, 210],
      },
      {
        index: 266,
        leftIdx: [263, 264, 265],
        rightIdx: [267, 268, 269],
      },
      {
        index: 399,
        leftIdx: [396, 397, 398],
        rightIdx: [400, 401, 402],
      },
      {
        index: 434,
        leftIdx: [431, 432, 433],
        rightIdx: [435, 436, 437],
      },
      {
        index: 450,
        leftIdx: [447, 448, 449],
        rightIdx: [451, 452, 453],
      },
      {
        index: 465,
        leftIdx: [462, 463, 464],
        rightIdx: [466, 467, 468],
      },
      {
        index: 518,
        leftIdx: [515, 516, 517],
        rightIdx: [519, 520, 521],
      },
      {
        index: 577,
        leftIdx: [574, 575, 576],
        rightIdx: [578, 579, 580],
      },
      {
        index: 628,
        leftIdx: [625, 626, 627],
        rightIdx: [629, 630, 631],
      },
      { index: 639, leftIdx: [636, 637, 638], rightIdx: [640, 641] },
    ]);
  });

  test("the located matches", () => {
    // TODO
  });
});