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

export { termValidator, subjectValidator, commonValidators, studentValidator };
