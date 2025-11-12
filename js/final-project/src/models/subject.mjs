import { convertStringToNumber, integerNumberValidator, stringValidator } from "../ustils/validations.mjs";

class Subject {
  constructor(id, code, name, creditHours, gradingSchemeId ) {
    id = convertStringToNumber(id);
    creditHours = convertStringToNumber(creditHours);
    integerNumberValidator(id, creditHours);
    stringValidator(code, name);

    if (creditHours < 1) {
        throw new Error('VALIDATION_ERROR: credit hours can not be less than one')
    }

    if (mode !== 'graded' && mode !== 'passfail') {
      throw new Error('VALIDATION_ERROR: mode must be "graded" or "passfail"');
    }

    this.id = id;
    this.code = code;
    this.name = name;
    this.creditHours = creditHours;
    this.gradingSchemeId = gradingSchemeId;
  }
}

export { Subject }
