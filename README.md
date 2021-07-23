# kwic-ts

>  Locate keywords-in-contexts

<!-- badges: start -->
[![CI](https://github.com/strboul/kwic-ts/actions/workflows/CI.yml/badge.svg)](https://github.com/strboul/kwic-ts/actions/workflows/CI.yml)
<!-- badges: end -->

KWIC (Keyword-in-context) helps you see a match with adjacent words in order to
convey more information about the context.

This library does only one thing, *KWIC*, and aims to do it well.  All sorts of
data/corpus cleaning and transformation are not in the purpose of this library.

## Usage

```typescript
import Kwic from "@strboul/kwic-ts";

const text = `
I'm a deep water sailor just come from Hong Kong
You give me some whiskey, I'll sing you a song

There's tinkers and tailors, shoemakers and all
They're all shipped for sailors aboard the Black Ball
`;
const term = "[s|t]ailor";
const kwic = new Kwic(text, term);
kwic.positions();
// ...
kwic.matches();
// ...
```

### API

| class                           | method         | description    |
|:-------------------------------:|:--------------:|:--------------:|
| `new Kwic(text, term, windows)` |                | new Kwic class |
|                                 | `.tokens`      | tokens object  |
|                                 | `.positions()` | get positions  |
|                                 | `.matches()`   | get matches    |
|                                 | `.ranges()`    | get ranges     |

## Installation

```bash
# TODO
npm install @strboul/kwic-ts
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
