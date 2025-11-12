import {
  isStringValidator,
  convertStringToNumber,
  isIntegerNumberValidator,
} from "../utils/validations.mjs";

class Term {
  constructor(id, name, startDate, endDate) {
    id = convertStringToNumber(id);
    isIntegerNumberValidator(id);
    isStringValidator(name);

    if (!/^\d{4}-[A-Za-z]+\d{1,2}$/.test(name)) {
      throw new Error('Invalid term name format. please enter smth like "2025-S1" or "2025-F2"');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error(
        "Invalid startDate or endDate format (must be ISO string)"
      );
    }

    if (start >= end) {
      throw new Error("startDate must be earlier than endDate");
    }

    this.id = id;
    this.name = name;
    this.startDate = start.toISOString();
    this.endDate = end.toISOString();
  }
}

export { Term };
