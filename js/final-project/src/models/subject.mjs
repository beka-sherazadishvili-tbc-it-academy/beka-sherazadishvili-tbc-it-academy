import { isIntegerNumberValidator, isStringValidator, convertStringToNumber } from "../utils/validations.mjs";

class Subject {
  #id;
  #code;
  #name;
  #creditHours;
  #gradingSchemeId;
  #mode;

  constructor(id, code, name, creditHours, gradingSchemeId = 'default', mode = 'graded') {
    if (id == null) {
      this.#id = null;
    } else {
      id = convertStringToNumber(id);
      isIntegerNumberValidator(id);
      this.#id = id;
    }
    creditHours = convertStringToNumber(creditHours);

    this.#id = id;
    this.#code = code;
    this.#name = name;
    this.#creditHours = creditHours;
    this.#gradingSchemeId = gradingSchemeId;
    this.#mode = mode;
  }

  // getters
  get id() {
    return this.#id;
  }

  get code() {
    return this.#code;
  }

  get name() {
    return this.#name;
  }

  get creditHours() {
    return this.#creditHours;
  }

  get gradingSchemeId() {
    return this.#gradingSchemeId;
  }

  get mode() {
    return this.#mode;
  }

  // setters
  set id(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#id = value;
  }

  set code(value) {
    isStringValidator(value);
    this.#code = value;
  }

  set name(value) {
    isStringValidator(value);
    this.#name = value;
  }

  set creditHours(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    if (value < 1) {
      throw new Error('VALIDATION_ERROR: credit hours cannot be less than one');
    }
    this.#creditHours = value;
  }

  set gradingSchemeId(value) {
    this.#gradingSchemeId = value;
  }

  set mode(value) {
    if (value !== 'graded' && value !== 'passfail') {
      throw new Error('VALIDATION_ERROR: mode must be "graded" or "passfail"');
    }
    this.#mode = value;
  }
}

export { Subject };
