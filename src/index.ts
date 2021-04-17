type Tokens = { text: string; name?: string }[];

interface KwicObject {
  tokens: Tokens;
  term: string;
  windowLeft: number;
  windowRight: number;
}

class Kwic implements KwicObject {
  windowLeft: number = 3;
  windowRight: number = 3;

  constructor(
    public tokens: Tokens,
    public term: string,
    windowLeft: number,
    windowRight: number
  ) {
    this.tokens = tokens;
    this.term = term;
    this.windowLeft = windowLeft;
    this.windowRight = windowRight;
  }
}

export default Kwic;
