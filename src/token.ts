import { Tokens } from "./kwic.model";

class Token {
  private tokens: Tokens = [];

  constructor(public text: string) {
    this.text = text;
  }

  tokenize(): Tokens {
    this.removeExtraSpacesFromText();
    this.tokenizeText();
    return this.tokens;
  }

  private tokenizeText(): void {
    this.tokens = this.text.split(" ");
  }

  private removeExtraSpacesFromText(): void {
    this.text = this.text.replace(/\n/g, " ");
    this.text = this.text.replace(/\s+/g, " ");
  }
}

export default Token;
