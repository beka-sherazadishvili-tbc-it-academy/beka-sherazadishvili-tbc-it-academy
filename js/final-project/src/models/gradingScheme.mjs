import { isIntegerNumberValidator, convertStringToNumber } from "../utils/validations.mjs";

class GradingScheme {
  #id;
  #breakpoints;

  constructor(id) {
    id = convertStringToNumber(id);
    isIntegerNumberValidator(id);

    this.#id = id;
    this.#breakpoints = [
      { minPercent: 97, letter: "A+", gpaPoints: 4.0 },
      { minPercent: 93, letter: "A",  gpaPoints: 4.0 },
      { minPercent: 90, letter: "A-", gpaPoints: 3.7 },
      { minPercent: 87, letter: "B+", gpaPoints: 3.3 },
      { minPercent: 83, letter: "B",  gpaPoints: 3.0 },
      { minPercent: 80, letter: "B-", gpaPoints: 2.7 },
      { minPercent: 77, letter: "C+", gpaPoints: 2.3 },
      { minPercent: 73, letter: "C",  gpaPoints: 2.0 },
      { minPercent: 70, letter: "C-", gpaPoints: 1.7 },
      { minPercent: 67, letter: "D+", gpaPoints: 1.3 },
      { minPercent: 63, letter: "D",  gpaPoints: 1.0 },
      { minPercent: 60, letter: "D-", gpaPoints: 0.7 },
      { minPercent: 0,  letter: "F",  gpaPoints: 0.0 }
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
