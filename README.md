# kwic.ts

It is indeed sometimes helpful to see the adjacent words of a matched word to
get an idea of the context.

KWIC (Keyword-in-context) helps you see the
matching words with the preceding and/or following words that might convey more
information about the matched word use.

## Usage

```js
import Kwic from "Kwic";

const kwic = new Kwic(tokens, "fox");
kwic.locate()
// output
```

It's also possible to specify the number of words before and after the matching
word independently *(default is 3)*.

```js
const kwic = new Kwic("text", "term", windowLeft = 5, windowRight = 1);
kwic.locate()
// output
```

## Installation

```bash
npm install kwic.ts
```

## Development

```bash
# run tests:
npm run test

# start debugger:
npm run test:debug-devtools # via Chrome DevTools
npm run test:debug-repl # via node REPL
```
