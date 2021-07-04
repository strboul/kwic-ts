export type TTokens = string[];

class Token {
  private tokensArr: TTokens = [];

  constructor(public text: string) {
    this.text = text;
  }

  get tokens(): TTokens {
    this.removeExtraSpacesFromText();
    this.tokenizeText();
    this.removeEmptyTokens();
    return this.tokensArr;
  }

  private removeEmptyTokens(): void {
    this.tokensArr = this.tokensArr.filter(Boolean);
  }

  private tokenizeText(): void {
    this.tokensArr = this.text.split(" ");
  }

  private removeExtraSpacesFromText(): void {
    this.text = this.text.replace(/\n/g, " ");
    this.text = this.text.replace(/\s+/g, " ");
  }
}

export default Token;
