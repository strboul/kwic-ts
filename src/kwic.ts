import * as KwicModel from "./kwic.model";
import Context from "./context";
import Token from "./token";
import Range from "./range";

class Kwic implements KwicModel.Input {
  public text: string;

  public term: string;

  constructor(text: string, term: string, public windows: number[] = [3, 3]) {
    this.text = text;
    this.term = term;
    this.windows = windows;
  }

  locate(): any {
    const hasTerm: boolean = this.hasTerm();
    if (!hasTerm) {
      return [];
    }

    const { tokens } = new Token(this.text);

    const context = new Context(tokens, this.term, this.windows);
    const contexted = context.getContext();

    const range = new Range(tokens, contexted!.positions as any);
    const ranges = range.getRanges();

    const out = { ranges, ...contexted };
    return out;
  }

  private hasTerm(): boolean {
    return this.text.search(this.term) !== -1;
  }
}

export default Kwic;
