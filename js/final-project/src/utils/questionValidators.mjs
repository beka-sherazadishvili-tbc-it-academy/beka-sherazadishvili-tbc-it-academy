import {
  isIntegerNumberValidator,
  isNumberValidator,
  isStringValidator,
  isEmailFormValidator,
  convertStringToNumber,
} from "./validations.mjs";

const commonValidators = {
  nonEmptyString: (fieldName) => (input) => {
    try {
      isStringValidator(input);
      return true;
    } catch (err) {
      throw new Error(
        `${fieldName}: ${err.message.replace("VALIDATION_ERROR: ", "")}`
      );
    }
  },

  arrayValidator: (fieldName) => (input) => {
    try {
      if(!Array.isArray(input) && input.length === 0) {
        throw new Error(`${fieldName}: VALIDATION_ERROR inpiut must be array format`)
      }
      return true;
    } catch (err) {
      return err.message
    }
  },

  booleanValidator: (fieldName) => (input) => {
    if (!["y", "n"].includes(input)) {
      throw new Error(`${fieldName} must be "y" or "n".`);
    }
    return true;
  },

  optionalString: () => (input) => {
    if (!input || input.trim() === "") {
      return true;
    }
    try {
      isStringValidator(input);
      return true;
    } catch (err) {
      throw new Error(err.message.replace("VALIDATION_ERROR: ", ""));
    }
  },

  positiveInteger: (fieldName) => (input) => {
    try {
      const num = convertStringToNumber(input);
      isIntegerNumberValidator(num);

      if (num <= 0) {
        throw new Error(`${fieldName} must be a positive integer`);
      }
      return true;
    } catch (err) {
      const cleanMessage = err.message.replace("VALIDATION_ERROR: ", "");
      throw new Error(`${fieldName}: ${cleanMessage}`);
    }
  },

  number: (fieldName) => (input) => {
    try {
      const num = convertStringToNumber(input);
      isNumberValidator(num);
      return true;
    } catch (err) {
      const cleanMessage = err.message.replace("VALIDATION_ERROR: ", "");
      throw new Error(`${fieldName}: ${cleanMessage}`);
    }
  },

  integerNumber: (fieldName) => (input) => {
    try {
      const num = convertStringToNumber(input);
      isIntegerNumberValidator(num);
      return true;
    } catch (err) {
      const cleanMessage = err.message.replace("VALIDATION_ERROR: ", "");
      throw new Error(`${fieldName}: ${cleanMessage}`);
    }
  },

  date: (fieldName) => (input) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(input)) {
      throw new Error(
        `${fieldName} must be in YYYY-MM-DD format (e.g., 2024-01-15)`
      );
    }

    const date = new Date(input);
    if (isNaN(date.getTime()) || date < Date.now()) {
      throw new Error(`Invalid ${fieldName}, date must be in the future`);
    }
    return true;
  },

  dateAfter: (fieldName, afterDate) => (input) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(input)) {
      throw new Error(
        `${fieldName} must be in YYYY-MM-DD format (e.g., 2024-06-15)`
      );
    }

    const date = new Date(input);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid ${fieldName}`);
    }

    const compareDate = new Date(afterDate);
    if (date <= compareDate) {
      throw new Error(`${fieldName} must be after ${afterDate}`);
    }

    return true;
  },

  statusValidator: (allowed) => (input) => {
    try {
      isStringValidator(input);

      if (!allowed.includes(input)) {
        throw new Error(
          `VALIDATION_ERROR: must be one of: ${allowed.join(", ")}`
        );
      }

      return true;
    } catch (err) {
      throw new Error(err.message.replace("VALIDATION_ERROR: ", ""));
    }
  },
};

// student validators
const studentValidator = {
  email: () => (input) => {
    if (!input || input.trim() === "") {
      return true;
    }
    try {
      isEmailFormValidator(input);
      return true;
    } catch (err) {
      throw new Error(err.message.replace("VALIDATION_ERROR: ", ""));
    }
  },
};

//subject validators
const subjectValidator = {
  creditHours: () => (input) => {
    try {
      const num = convertStringToNumber(input);
      isIntegerNumberValidator(num);
      if (num < 1) {
        throw new Error(
          "VALIDATION_ERROR: credit hours cannot be less than one"
        );
      }
      return true;
    } catch (err) {
      throw new Error(err.message.replace("VALIDATION_ERROR: ", ""));
    }
  },

  checkMode: () => (input) => {
    try {
      isStringValidator(input);
      if (input !== "graded" && input !== "passfail") {
        throw new Error(
          'VALIDATION_ERROR: mode must be "graded" or "passfail"'
        );
      }
      return true;
    } catch (err) {
      throw new Error(err.message.replace("VALIDATION_ERROR: ", ""));
    }
  },
};

//term validators
const termValidator = {
  checkTermName: () => (input) => {
    try {
      isStringValidator(input);
      if (!/^\d{4}-[A-Za-z]+\d{1,2}$/.test(input)) {
        throw new Error(
          'Invalid term name format. Please enter something like "2025-S1" or "2025-F2"'
        );
      }
      return true;
    } catch (err) {
      throw new Error(err.message.replace("VALIDATION_ERROR: ", ""));
    }
  },
};

// enrollment validation
const enrollmentValidator = {};

//assessment validation
const assessmentValidation = {
  weightPercentValidator: () => (input) => {
    try {
      const num = convertStringToNumber(input);
      isIntegerNumberValidator(num);
      if (num < 0 || num > 100) {
        throw new Error("weightPercent should be between 0 and 100");
      }
      return true;
    } catch (err) {
      throw new Error(err.message.replace("VALIDATION_ERROR: ", ""));
    }
  },

  pointValidation: () => (input) => {
    try {
      const num = convertStringToNumber(input);
      isIntegerNumberValidator(num);
      if (num < 0) {
        throw new Error("point should not be below 0");
      }
      return true;
    } catch (err) {
      throw new Error(err.message.replace("VALIDATION_ERROR: ", ""));
    }
  },

  typeValidation: (input) => {
    try {
      isStringValidator(input);
      const allowedTypes = ["quiz", "exam", "project"];
      if (!allowedTypes.includes(input)) {
        throw new Error(
          `Invalid type: ${input}, please enter one of those values - "quiz", "exam", "project"`
        );
      }
      return true;
    } catch (err) {
      throw new Error(err.message.replace("VALIDATION_ERROR: ", ""));
    }
  },

  fieldValidator: (fieldName) => (input) => {
    try {
      switch (fieldName) {
        case "name":
        case "type":
        case "dueDate":
          isStringValidator(input);
          break;

        case "subjectId":
        case "termId":
        case "maxPoints":
        case "weightPercent": {
          const num = convertStringToNumber(input);
          isIntegerNumberValidator(num);
          break;
        }

        case "locked":
          if (!["y", "n"].includes(input)) {
            throw new Error(`locked must be "y" or "n"`);
          }
          break;

        default:
          throw new Error(`Unknown field: ${fieldName}`);
      }

      return true;
    } catch (err) {
      throw new Error(err.message.replace("VALIDATION_ERROR: ", ""));
    }
  },
};

export {
  assessmentValidation,
  termValidator,
  subjectValidator,
  commonValidators,
  studentValidator,
};
