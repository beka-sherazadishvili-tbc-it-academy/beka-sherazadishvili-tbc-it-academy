class Fx {
  private static rates: Map<string, number> = new Map();

  private constructor() {}

  static setRate(code: string, rate: number): void {
    if (rate <= 0) {
      throw new Error("Rate must be positive");
    }
    this.rates.set(code.toUpperCase(), rate);
  }

  static convert(
    amount: number,
    sourceCode: string,
    targetCode: string
  ): number {
    if (!isFinite(amount) || amount < 0) {
      throw new Error("invalid number");
    }
    sourceCode = sourceCode.toUpperCase();
    targetCode = targetCode.toUpperCase();

    if (
      !this.rates.has(sourceCode) ||
      !this.rates.has(targetCode)
    ) {
        throw new Error('no such fx')
    }

    return (amount / this.rates.get(sourceCode)!) * this.rates.get(targetCode)!;
  }
}
