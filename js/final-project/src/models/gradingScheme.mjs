import { isIntegerNumberValidator, convertStringToNumber } from "../utils/validations.mjs";

class GradingScheme {
  #id;
  #breakpoints;

  constructor(id) {
    id = convertStringToNumber(id);
    isIntegerNumberValidator(id);

    this.#id = id;
    this.#breakpoints = [
      { minPercent: 90, letter: 'A', gpaPoints: 4.0 },
      { minPercent: 80, letter: 'B', gpaPoints: 3.0 },
      { minPercent: 70, letter: 'C', gpaPoints: 2.0 },
      { minPercent: 60, letter: 'D', gpaPoints: 1.0 },
      { minPercent: 0, letter: 'F', gpaPoints: 0.0 }
    ];
  }

  get id() {
    return this.#id;
  }

  set id(newId) {
    newId = convertStringToNumber(newId);
    isIntegerNumberValidator(newId);
    this.#id = newId;
  }

  get breakpoints() {
    return this.#breakpoints;
  }
}

export { GradingScheme };
