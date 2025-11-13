import { isIntegerNumberValidator, isStringValidator, convertStringToNumber } from '../utils/validations.mjs';

class Score {
  #id;
  #assessmentId;
  #studentId;
  #points;
  #recordedAt;

  constructor(
    id, 
    assessmentId,
    studentId, 
    points,
    recordedAt
  ) {
    // check integers
    id = convertStringToNumber(id);
    assessmentId = convertStringToNumber(assessmentId);
    studentId = convertStringToNumber(studentId);
    points = convertStringToNumber(points);
    isIntegerNumberValidator(id, assessmentId, studentId, points);

    if (points < 0) {
      throw new Error('points must be at least 0.');
    }

    // check dates
    const date = new Date(recordedAt);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid recordedAt format (must be ISO string)');
    }

    this.#id = id;
    this.#assessmentId = assessmentId;
    this.#studentId = studentId;
    this.#points = points;
    this.#recordedAt = date.toISOString();
  }

  // getters
  get getId() {
    return this.#id;
  }

  get getAssessmentId() {
    return this.#assessmentId;
  }

  get getStudentId() {
    return this.#studentId;
  }

  get getPoints() {
    return this.#points;
  }

  get gerRecordedAt() {
    return this.#recordedAt;
  }

  // setters
  set id(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#id = value;
  }

  set assessmentId(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#assessmentId = value;
  }

  set studentId(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#studentId = value;
  }

  set points(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    if (value < 0) {
      throw new Error('points must be at least 0.');
    }
    this.#points = value;
  }

  set recordedAt(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid recordedAt format (must be ISO string)');
    }
    this.#recordedAt = date.toISOString();
  }
}

export { Score };
