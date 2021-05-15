import * as KwicModel from "./kwic.model";
import Context from "./context";
import Token from "./token";

class Kwic implements KwicModel.Input {
  public text: string;
  public term: string;

  constructor(
    text: string,
    term: string,
    public windowLeft: number = 3,
    public windowRight: number = 3
  ) {
    this.text = text;
    this.term = term;
    this.windowLeft = windowLeft;
    this.windowRight = windowRight;
  }

  locate() {
    const hasTerm: boolean = this.hasTerm();
    if (!hasTerm) {
      return null;
    }

    const token = new Token(this.text);
    const tokens = token.tokenize();

    const context = new Context(
      tokens,
      this.term,
      this.windowLeft,
      this.windowRight
    );
    const contexted = context.getContext();
    return contexted;
  }

  private hasTerm(): boolean {
    return this.text.search(this.term) !== -1;
  }
}

export default Kwic;
