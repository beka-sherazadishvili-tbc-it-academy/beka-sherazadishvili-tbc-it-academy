import {
  isStringValidator,
  convertStringToNumber,
  isIntegerNumberValidator,
} from "../utils/validations.mjs";

class Term {
  #id;
  #name;
  #startDate;
  #endDate;

  constructor(id, name, startDate, endDate) {
    if (id == null) {
      this.#id = null;
    } else {
      id = convertStringToNumber(id);
      isIntegerNumberValidator(id);
      this.#id = id;
    }

    this.#id = id;
    this.#name = name;
    this.#startDate = startDate;
    this.#endDate = endDate;
  }

  // getters
  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get startDate() {
    return this.#startDate;
  }

  get endDate() {
    return this.#endDate;
  }

  // setters
  set id(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#id = value;
  }

  set name(value) {
    isStringValidator(value);
    if (!/^\d{4}-[A-Za-z]+\d{1,2}$/.test(value)) {
      throw new Error('VALIDATION_ERROR: invalid term name format. Please enter something like "2025-S1" or "2025-F2"');
    }
    this.#name = value;
  }

  set startDate(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('VALIDATION_ERROR: invalid startDate format (must be ISO string)');
    }
    this.#startDate = date.toISOString();
  }

  set endDate(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('VALIDATION_ERROR: invalid endDate format (must be ISO string)');
    }
    if (new Date(this.#startDate) >= date) {
      throw new Error('VALIDATION_ERROR: endDate must be later than startDate');
    }
    this.#endDate = date.toISOString();
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      startDate: this.#startDate,
      endDate: this.#endDate,
    };
  }

  static fromJSON(obj) {
    return new Term(obj.id, obj.name, obj.startDate, obj.endDate);
  }
}

export { Term };
