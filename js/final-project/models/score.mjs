import {
  isIntegerNumberValidator,
  convertStringToNumber,
} from "../utils/validations.mjs";

class Score {
  #id;
  #assessmentId;
  #studentId;
  #points;
  #recordedAt;
  #history;

  constructor(id, assessmentId, studentId, points, recordedAt, history = []) {
    if (id == null) {
      this.#id = null;
    } else {
      id = convertStringToNumber(id);
      isIntegerNumberValidator(id);
      this.#id = id;
    }

    assessmentId = convertStringToNumber(assessmentId);
    studentId = convertStringToNumber(studentId);
    points = convertStringToNumber(points);

    const date = new Date(recordedAt);
    if (isNaN(date.getTime())) {
      throw new Error("VALIDATION_ERROR: invalid recordedAt format (must be ISO string)");
    }

    this.#assessmentId = assessmentId;
    this.#studentId = studentId;
    this.#points = points;
    this.#recordedAt = date.toISOString();

    if (!Array.isArray(history)) {
      throw new Error("VALIDATION_ERROR: history must be array");
    }

    this.#history = history.map((item) => {
      const hisotryDate = new Date(item.recordedAt);
      if (isNaN(hisotryDate.getTime())) {
        throw new Error("VALIDATION_ERROR: invalid recordedAt format in history");
      }

      return {
        points: convertStringToNumber(item.points),
        recordedAt: hisotryDate.toISOString(),
      };
    });
  }

  get id() {
    return this.#id;
  }

  get assessmentId() {
    return this.#assessmentId;
  }

  get studentId() {
    return this.#studentId;
  }

  get points() {
    return this.#points;
  }

  get recordedAt() {
    return this.#recordedAt;
  }

  get history() {
    return this.#history;
  }

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
      throw new Error("VALIDATION_ERROR: points must be 0 or greater.");
    }
    this.#points = value;
  }

  set recordedAt(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error("VALIDATION_ERROR: invalid recordedAt format (must be ISO string)");
    }
    this.#recordedAt = date.toISOString();
  }

  toJSON() {
    return {
      id: this.#id,
      assessmentId: this.#assessmentId,
      studentId: this.#studentId,
      points: this.#points,
      recordedAt: this.#recordedAt,
      history: this.#history,
    };
  }

  static fromJSON(json) {
    return new Score(
      json.id,
      json.assessmentId,
      json.studentId,
      json.points,
      json.recordedAt,
      json.history || []
    );
  }
}

export { Score };
