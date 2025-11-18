import {
  isIntegerNumberValidator,
  isStringValidator,
  convertStringToNumber,
} from '../utils/validations.mjs';

class Enrollment {
  #id;
  #studentId;
  #subjectId;
  #termId;
  #status;
  #attemptNumber;
  #createdAt;
  #droppedAt;
  #completedAt;

  constructor(
    id,
    studentId,
    subjectId,
    termId,
    status,
    attemptNumber,
    createdAt,
    droppedAt = null,
    completedAt = null
  ) {
    // check integers
    if (id == null) {
      this.#id = null;
    } else {
      id = convertStringToNumber(id);
      isIntegerNumberValidator(id);
      this.#id = id;
    }
    studentId = convertStringToNumber(studentId);
    subjectId = convertStringToNumber(subjectId);
    termId = convertStringToNumber(termId);
    attemptNumber = convertStringToNumber(attemptNumber);

    const allowedStatuses = ['active', 'dropped', 'completed', 'withdrawn', 'incomplete'];
    if (!allowedStatuses.includes(status)) {
      throw new Error(`VALIDATION_ERROR: invalid status: ${status}`);
    }

    this.#id = id;
    this.#studentId = studentId;
    this.#subjectId = subjectId;
    this.#termId = termId;
    this.#status = status;
    this.#attemptNumber = attemptNumber;
    this.#createdAt = createdAt;
    this.#droppedAt = droppedAt;
    this.#completedAt = completedAt;
  }

  // getters
  get id() {
    return this.#id;
  }

  get studentId() {
    return this.#studentId;
  }

  get subjectId() {
    return this.#subjectId;
  }

  get termId() {
    return this.#termId;
  }

  get status() {
    return this.#status;
  }

  get attemptNumber() {
    return this.#attemptNumber;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get droppedAt() {
    return this.#droppedAt;
  }

  get completedAt() {
    return this.#completedAt;
  }

  // setters
  set id(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#id = value;
  }

  set studentId(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#studentId = value;
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

  set status(value) {
    isStringValidator(value);
    const allowedStatuses = ['active', 'dropped', 'completed', 'withdrawn'];
    if (!allowedStatuses.includes(value)) {
      throw new Error(`VALIDATION_ERROR: invalid status: ${value}`);
    }
    this.#status = value;
  }

  set attemptNumber(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    if (value < 1) {
      throw new Error('VALIDATION_ERROR: attemptNumber must be at least 1.');
    }
    this.#attemptNumber = value;
  }

  set createdAt(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('VALIDATION_ERROR: invalid createdAt format (must be ISO string)');
    }
    this.#createdAt = date.toISOString();
  }

  set droppedAt(value) {
    if (value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('VALIDATION_ERROR: invalid droppedAt format (must be ISO string)');
      }
      this.#droppedAt = date.toISOString();
    } else {
      this.#droppedAt = null;
    }
  }

  set completedAt(value) {
    if (value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('VALIDATION_ERROR: invalid completedAt format (must be ISO string)');
      }
      this.#completedAt = date.toISOString();
    } else {
      this.#completedAt = null;
    }
  }

  toJSON() {
    return {
      id: this.#id,
      studentId: this.#studentId,
      subjectId: this.#subjectId,
      termId: this.#termId,
      status: this.#status,
      attemptNumber: this.#attemptNumber,
      createdAt: this.#createdAt,
      droppedAt: this.#droppedAt,
      completedAt: this.#completedAt,
    };
  }

  static fromJSON(obj) {
    return new Enrollment(
      obj.id,
      obj.studentId,
      obj.subjectId,
      obj.termId,
      obj.status,
      obj.attemptNumber,
      obj.createdAt,
      obj.droppedAt,
      obj.completedAt
    );
  }
}

export { Enrollment };
