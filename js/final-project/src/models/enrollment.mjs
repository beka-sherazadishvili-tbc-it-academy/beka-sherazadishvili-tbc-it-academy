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
    id = convertStringToNumber(id);
    studentId = convertStringToNumber(studentId);
    subjectId = convertStringToNumber(subjectId);
    termId = convertStringToNumber(termId);
    attemptNumber = convertStringToNumber(attemptNumber);
    isIntegerNumberValidator(id, studentId, subjectId, termId, attemptNumber);

    if (attemptNumber < 1) {
      throw new Error('attemptNumber must be at least 1.');
    }

    // check strings
    isStringValidator(status);

    const allowedStatuses = ['active', 'dropped', 'completed', 'withdrawn'];
    if (!allowedStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }

    // check dates
    const create = new Date(createdAt);
    if (isNaN(create.getTime())) {
      throw new Error('Invalid createdAt format (must be ISO string)');
    }

    let drop = null;
    if (droppedAt) {
      drop = new Date(droppedAt);
      if (isNaN(drop.getTime())) {
        throw new Error('Invalid droppedAt format (must be ISO string)');
      }
    }

    let complete = null;
    if (completedAt) {
      complete = new Date(completedAt);
      if (isNaN(complete.getTime())) {
        throw new Error('Invalid completedAt format (must be ISO string)');
      }
    }

    // // Status and dates validation
    // if (status === 'dropped' && !droppedAt) {
    //   throw new Error('droppedAt is required when status is 'dropped'');
    // }
    // if (status === 'completed' && !completedAt) {
    //   throw new Error('completedAt is required when status is 'completed'');
    // }
    // if ((status === 'active' || status === 'withdrawn') && (droppedAt || completedAt)) {
    //   throw new Error(`Status '${status}' should not have droppedAt or completedAt`);
    // }

    this.#id = id;
    this.#studentId = studentId;
    this.#subjectId = subjectId;
    this.#termId = termId;
    this.#status = status;
    this.#attemptNumber = attemptNumber;
    this.#createdAt = create.toISOString();
    this.#droppedAt = drop ? drop.toISOString() : null;
    this.#completedAt = complete ? complete.toISOString() : null;
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
      throw new Error(`Invalid status: ${value}`);
    }
    this.#status = value;
  }

  set attemptNumber(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    if (value < 1) {
      throw new Error('attemptNumber must be at least 1.');
    }
    this.#attemptNumber = value;
  }

  set createdAt(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid createdAt format (must be ISO string)');
    }
    this.#createdAt = date.toISOString();
  }

  set droppedAt(value) {
    if (value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid droppedAt format (must be ISO string)');
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
        throw new Error('Invalid completedAt format (must be ISO string)');
      }
      this.#completedAt = date.toISOString();
    } else {
      this.#completedAt = null;
    }
  }
}

export { Enrollment };
