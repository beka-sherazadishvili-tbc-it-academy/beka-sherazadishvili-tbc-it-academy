interface Rule<T> {
  name: string;
  check(value: T): boolean;
  message: string;
}

class ValidatorBuilder<T> {
  private rules: Rule<T>[];

  constructor() {
    this.rules = [];
  }

  addRule(input: Rule<T>): this {
    this.rules.push(input);
    return this;
  }

  validate(value: T): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const rule of this.rules) {
      if (!rule.check(value)) {
        errors.push(rule.message);
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors,
    };
  }
}
