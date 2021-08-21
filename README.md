# kwic-ts

>  Locate keywords-in-contexts

<!-- badges: start -->
[![CI](https://github.com/strboul/kwic-ts/actions/workflows/CI.yml/badge.svg)](https://github.com/strboul/kwic-ts/actions/workflows/CI.yml)
[![deploy-gh-pages](https://github.com/strboul/kwic-ts/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/strboul/kwic-ts/actions/workflows/deploy-gh-pages.yml)
[![npm](https://img.shields.io/npm/v/@strboul/kwic-ts?color=%23EA2039)](https://www.npmjs.com/package/@strboul/kwic-ts)
<!-- badges: end -->

KWIC (Keyword-in-context) helps you see a match with adjacent words in order to
convey more information about the context.

## Usage

```typescript
import { Kwic } from "@strboul/kwic-ts";

const text = `
I'm a deep water sailor just come from Hong Kong
You give me some whiskey, I'll sing you a song

There's tinkers and tailors, shoemakers and all
They're all shipped for sailors aboard the Black Ball
`;
const term = "[s|t]ailor";
const kwic = new Kwic(text, term, [3, 3]);
kwic.getMatches();
// [
//   {
//     index: 'sailor',
//     left: [ 'a', 'deep', 'water' ],
//     right: [ 'just', 'come', 'from' ]
//   },
//   {
//     index: 'tailors,',
//     left: [ "There's", 'tinkers', 'and' ],
//     right: [ 'shoemakers', 'and', 'all' ]
//   },
//   {
//     index: 'sailors',
//     left: [ 'all', 'shipped', 'for' ],
//     right: [ 'aboard', 'the', 'Black' ]
//   }
// ]
```

### API

| class                           | method            | description                 |
|:-------------------------------:|:-----------------:|:---------------------------:|
| `new Kwic(text, term, windows)` |                   | new Kwic class              |
|                                 | `.getPositions()` | get word positions          |
|                                 | `.getMatches()`   | get word matches            |
|                                 | `.getRanges()`    | get matched word ranges     |

## Installation

```bash
$ npm install @strboul/kwic-ts
```

#### CDN

```html
<script src="https://unpkg.com/@strboul/kwic-ts/dist/kwic.js"></script>
```

## Development

<details>

### Running tests & debugging

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

### General

+ The TS *types* starts with a `T` and follow the UpperCamelCase. Same rule
  applies for the *interfaces* but they start with an `I`.

</details>
