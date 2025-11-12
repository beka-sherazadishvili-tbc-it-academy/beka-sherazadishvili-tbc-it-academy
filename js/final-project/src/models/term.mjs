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
    id = convertStringToNumber(id);
    isIntegerNumberValidator(id);
    isStringValidator(name);

    if (!/^\d{4}-[A-Za-z]+\d{1,2}$/.test(name)) {
      throw new Error('Invalid term name format. Please enter something like "2025-S1" or "2025-F2"');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Invalid startDate or endDate format (must be ISO string)');
    }

    if (start >= end) {
      throw new Error('startDate must be earlier than endDate');
    }

    this.#id = id;
    this.#name = name;
    this.#startDate = start.toISOString();
    this.#endDate = end.toISOString();
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
      throw new Error('Invalid term name format. Please enter something like "2025-S1" or "2025-F2"');
    }
    this.#name = value;
  }

  set startDate(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid startDate format (must be ISO string)');
    }
    this.#startDate = date.toISOString();
  }

  set endDate(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid endDate format (must be ISO string)');
    }
    if (new Date(this.#startDate) >= date) {
      throw new Error('endDate must be later than startDate');
    }
    this.#endDate = date.toISOString();
  }
}

export { Term };
