import {
  isIntegerNumberValidator,
  isStringValidator,
  convertStringToNumber,
} from "../utils/validations.mjs";
import { Meta } from "./helperModels/meta.mjs";

class Student {
  #id;
  #firstName;
  #lastName;
  #gradeLevel;
  #meta;

  constructor(id, firstName, lastName, gradeLevel, meta = new Meta()) {
    if (id == null) {
      this.#id = null;
    } else {
      id = convertStringToNumber(id);
      isIntegerNumberValidator(id);
      this.#id = id;
    }

    if (!(meta instanceof Meta)) {
      throw new Error("meta must be an instance of Meta");
    }

    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#gradeLevel = gradeLevel;
    this.#meta = meta;
  }

  // getters
  get id() {
    return this.#id;
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  get gradeLevel() {
    return this.#gradeLevel;
  }

  get meta() {
    return this.#meta;
  }

  // setters
  set id(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#id = value;
  }

  set firstName(value) {
    isStringValidator(value);
    this.#firstName = value;
  }

  set lastName(value) {
    isStringValidator(value);
    this.#lastName = value;
  }

  set gradeLevel(value) {
    isStringValidator(value);
    this.#gradeLevel = value;
  }

  set meta(value) {
    if (!(value instanceof Meta)) {
      throw new Error('meta must be an instance of Meta');
    }
    this.#meta = value;
  }

  toJSON() {
    return {
      id: this.#id,
      firstName: this.#firstName,
      lastName: this.#lastName,
      gradeLevel: this.#gradeLevel,
      meta:
        this.#meta instanceof Object && typeof this.#meta.toJSON === 'function'
          ? this.#meta.toJSON()
          : this.#meta,
    };
  }

  static fromJSON(obj) {
    return new Student(
      obj.id,
      obj.firstName,
      obj.lastName,
      obj.gradeLevel,
      new Meta(obj.meta.guardianName, obj.meta.email)
    );
  }
}

export { Student };
