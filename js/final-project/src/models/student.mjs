import { isIntegerNumberValidator, isStringValidator, convertStringToNumber } from "../utils/validations.mjs";
import { Meta } from "./helperModels/meta.mjs";

class Student {
  constructor(id, firstName, lastName, gradeLevel, meta = new Meta()) {
    id = convertStringToNumber(id);
    isIntegerNumberValidator(id);
    isStringValidator(firstName, lastName, gradeLevel);

    if (!(meta instanceof Meta)) {
      throw new Error('meta must be an instance of Meta');
    }

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gradeLevel = gradeLevel;
    this.meta = meta;
  }
}

export { Student }
