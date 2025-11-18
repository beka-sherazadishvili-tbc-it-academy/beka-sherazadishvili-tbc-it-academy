import {
  isIntegerNumberValidator,
  convertStringToNumber,
} from "../utils/validations.mjs";

class Attendance {
  #id;
  #studentId;
  #subjectId;
  #termId;
  #date;
  #status;

  constructor(id, studentId, subjectId, termId, date, status) {
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

    this.#id = id;
    this.#studentId = studentId;
    this.#subjectId = subjectId;
    this.#termId = termId;
    this.#date = date;
    this.#status = status;
  }

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

  get date() {
    return this.#date;
  }

  get status() {
    return this.#status;
  }

  set id(value) {
    value = convertStringToNumber(value);
    isIntegerNumberValidator(value);
    this.#id = value;
  }

  set studentId(value) {
    value = convertStringToNumber(value);
    this.#studentId = value;
  }

  set subjectId(value) {
    value = convertStringToNumber(value);
    this.#subjectId = value;
  }

  set termId(value) {
    value = convertStringToNumber(value);
    this.#termId = value;
  }

  set date(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error("VALIDATION_ERROR: invalid date format");
    }
    this.#date = date.toISOString();
  }

  set status(newStatus) {
    const allowedStatuses = ["P", "A", "L"];
    if (!allowedStatuses.includes(newStatus)) {
      throw new Error(`VALIDATION_ERROR: invalid attendance status: ${newStatus}`);
    }
    this.#status = newStatus;
  }

  toJSON() {
    return {
      id: this.#id,
      studentId: this.#studentId,
      subjectId: this.#subjectId,
      termId: this.#termId,
      date: this.#date,
      status: this.#status,
    };
  }

  static fromJSON(obj) {
    return new Attendance(
      obj.id,
      obj.studentId,
      obj.subjectId,
      obj.termId,
      obj.date,
      obj.status
    );
  }
}

export { Attendance };
