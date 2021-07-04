# kwic-ts

>  Locate keywords-in-contexts

<!-- badges: start -->
[![CI](https://github.com/strboul/kwic-ts/actions/workflows/CI.yml/badge.svg)](https://github.com/strboul/kwic-ts/actions/workflows/CI.yml)
<!-- badges: end -->

*[WIP]*

KWIC (Keyword-in-context) helps you see a match with adjacent words in order to
convey more information about the context.

## Usage

```js
import Kwic from "@strboul/kwic-ts";

const text = `
I'm a deep water sailor just come from Hong Kong
You give me some whiskey, I'll sing you a song

There's tinkers and tailors, shoemakers and all
They're all shipped for sailors aboard the Black Ball
`;
const pattern = "[s|t]ailor";
const kwic = new Kwic(text, pattern);
kwic.locate();
// {
//   positions: [
//     { index: 5, leftIdx: [2, 3, 4], rightIdx: [6, 7, 8] },
//     { index: 24, leftIdx: [21, 22, 23], rightIdx: [25, 26, 27] },
//     { index: 32, leftIdx: [29, 30, 31], rightIdx: [33, 34, 35] },
//   ],
//   matches: [
//     {
//       index: "sailor",
//       leftIdx: ["a", "deep", "water"],
//       rightIdx: ["just", "come", "from"],
//     },
//     {
//       index: "tailors,",
//       leftIdx: ["There's", "tinkers", "and"],
//       rightIdx: ["shoemakers", "and", "all"],
//     },
//     {
//       index: "sailors",
//       leftIdx: ["all", "shipped", "for"],
//       rightIdx: ["aboard", "the", "Black"],
//     },
//   ],
// };
```

## API

`kwic-ts` uses [Method chaining](https://en.wikipedia.org/wiki/Method_chaining)
for its API. Given the table below, `tokens` object and `positions()` method
can be obtained from the class, `matches()` and `ranges()` methods can be
retrieved from the `positions()` method object.

| class or method                 |                |              | description        |
|:-------------------------------:|:--------------:|:------------:|:------------------:|
| `new Kwic(text, term, windows)` |                |              | new Kwic class     |
|                                 | `.tokens`      |              | tokens object      |
|                                 | `.positions()` |              | get word positions |
|                                 |                | `.matches()` | get word matches   |
|                                 |                | `.ranges()`  | get word ranges    |

e.g. for the word matches, one should run `new Kwic(...).positions().ranges()`.

## Installation

```bash
# TODO
npm install @strboul/kwic-ts
```

## Development

<details>

```bash
# run tests:
npm run test

# start debugger:
npm run test:debug-devtools # via Chrome DevTools

npm run test:debug-repl # via node.js REPL
npm run test:debug-repl -- kwic.test.ts -t "token" # specify optional file and test pattern

npm run npm:link # create a symbolic link from globally-installed package-name to node_modules
npm run npm:publish # publish to npm registry (with credentials)
```

</details>
