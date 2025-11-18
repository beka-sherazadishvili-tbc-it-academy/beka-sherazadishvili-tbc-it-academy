import {
  isIntegerNumberValidator,
  convertStringToNumber,
} from "../utils/validations.mjs";

class GradingScheme {
  #id;
  #breakpoints;

  constructor(id, breakpoints) {
    if (id == null) {
      this.#id = null;
    } else {
      id = convertStringToNumber(id);
      isIntegerNumberValidator(id);
      this.#id = id;
    }
    
    if (!Array.isArray(breakpoints)) {
      throw new Error("VALIDATION_ERROR: gradingScheme breakpoints must be an array");
    }

    this.#breakpoints = Object.freeze(
      breakpoints.map((bp) => ({
        minPercent: Number(bp.minPercent),
        letter: String(bp.letter),
        gpaPoints: Number(bp.gpaPoints),
      }))
    );
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

  toJSON() {
    return {
      id: this.#id,
      breakpoints: this.#breakpoints,
    };
  }

  static fromJSON(obj) {
    return new GradingScheme(obj.id, obj.breakpoints);
  }
}

export { GradingScheme };
