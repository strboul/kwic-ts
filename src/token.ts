export type TTokens = string[];

class Token {
  private tokensArr: TTokens = [];

  constructor(public text: string) {
    this.text = text;
  }

  get tokens(): TTokens {
    this.joinNewlines();
    this.tokenizeText();
    this.removeEmptyTokens();
    return this.tokensArr;
  }

  private joinNewlines(): void {
    this.text = this.text.replace(/\n/g, " ");
  }

  private tokenizeText(): void {
    this.tokensArr = this.text.split(/(\s+)/);
  }

  private removeEmptyTokens(): void {
    this.tokensArr = this.tokensArr.filter(Boolean);
  }
}

export { Token };
