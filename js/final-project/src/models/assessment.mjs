import { isIntegerNumberValidator, isStringValidator, convertStringToNumber } from '../utils/validations.mjs';

class Assessment {
  #id;
  #subjectId;
  #termId;
  #name;
  #type;
  #maxPoints;
  #weightPercent;
  #dueDate;
  #locked;

  constructor(
    id, 
    subjectId,
    termId, 
    name,
    type,
    maxPoints,
    weightPercent,
    dueDate,
    locked = false,
  ) {
    // Validate fields using constructor validation
    id = convertStringToNumber(id);
    subjectId = convertStringToNumber(subjectId);
    termId = convertStringToNumber(termId);
    maxPoints = convertStringToNumber(maxPoints);
    weightPercent = convertStringToNumber(weightPercent);
    isIntegerNumberValidator(id, subjectId, termId, maxPoints, weightPercent);

    if (maxPoints < 0) {
      throw new Error('maxPoints must be at least 0.');
    }

    if (weightPercent < 0 || weightPercent > 100) {
      throw new Error('weightPercent should be between 0 and 100');
    }

    // check strings
    isStringValidator(name, type);

    const allowedTypes = ['quiz', 'exam', 'project'];
    if (!allowedTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}`);
    }

    // check dates
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid dueDate format (must be ISO string)');
    }

    if (date.getTime() < Date.now()) {
      throw new Error('Due date must be in the future.');
    }

    // check booleans
    if (typeof locked !== 'boolean') {
      throw new Error('locked should be boolean type');
    }

    this.#id = id;
    this.#subjectId = subjectId;
    this.#termId = termId;
    this.#name = name;
    this.#type = type;
    this.#maxPoints = maxPoints;
    this.#weightPercent = weightPercent;
    this.#dueDate = date.toISOString();
    this.#locked = locked;
  }

  // getters
  get id() {
    return this.#id;
  }

  get subjectId() {
    return this.#subjectId;
  }

  get termId() {
    return this.#termId;
  }

  get name() {
    return this.#name;
  }

  get type() {
    return this.#type;
  }

  get maxPoints() {
    return this.#maxPoints;
  }

  get weightPercent() {
    return this.#weightPercent;
  }

  get dueDate() {
    return this.#dueDate;
  }

  get locked() {
    return this.#locked;
  }

  // setters
  set id(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#id = value;
  }

  set subjectId(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#subjectId = value;
  }

  set termId(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#termId = value;
  }

  set name(value) {
    isStringValidator(value);
    this.#name = value;
  }

  set type(value) {
    const allowedTypes = ['quiz', 'exam', 'project'];
    if (!allowedTypes.includes(value)) {
      throw new Error(`Invalid type: ${value}`);
    }
    this.#type = value;
  }

  set maxPoints(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    if (value < 0) {
      throw new Error('maxPoints must be at least 0.');
    }
    this.#maxPoints = value;
  }

  set weightPercent(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    if (value < 0 || value > 100) {
      throw new Error('weightPercent should be between 0 and 100');
    }
    this.#weightPercent = value;
  }

  set dueDate(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid dueDate format (must be ISO string)');
    }
    if (date.getTime() < Date.now()) {
      throw new Error('Due date must be in the future.');
    }
    this.#dueDate = date.toISOString();
  }

  set locked(value) {
    if (typeof value !== 'boolean') {
      throw new Error('locked should be boolean type');
    }
    this.#locked = value;
  }
}

export { Assessment };
