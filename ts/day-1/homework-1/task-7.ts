class Account {
  public readonly id: string;
  protected _balance: number = 0;

  constructor(id: string) {
    this.id = id;
  }

  public balance(): number {
    return this._balance;
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("must be positive");
    }
    this._balance += amount;
  }

  public withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("must be positive");
    }
    if (amount > this._balance) {
      throw new Error("insufficient funds");
    }
    this._balance -= amount;
  }
}

class SavingsAccount extends Account {
  private minBalance: number;

  constructor(id: string, minBalance: number) {
    super(id);
    this.minBalance = minBalance;
  }

  public withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("must be positive");
    }
    if (this._balance - amount < this.minBalance) {
      throw new Error("min balance");
    }
    this._balance -= amount;
  }
}
