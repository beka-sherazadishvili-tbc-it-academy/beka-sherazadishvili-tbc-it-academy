import { isIntegerNumberValidator, convertStringToNumber } from "../utils/validations.mjs";

class Attendance {
  #id;
  #studentId;
  #subjectId;
  #termId;
  #date;
  #status;

  constructor(id, studentId, subjectId, termId, date, status) {
    id = convertStringToNumber(id);
    studentId = convertStringToNumber(studentId);
    subjectId = convertStringToNumber(subjectId);
    termId = convertStringToNumber(termId);
    isIntegerNumberValidator(id, studentId, subjectId, termId);

    const attendanceDate = new Date(date);
    if (isNaN(attendanceDate.getTime())) {
      throw new Error('Invalid date format (must be ISO string)');
    }

    const allowedStatuses = ["P", "A", "L"];
    if (!allowedStatuses.includes(status)) {
      throw new Error(`Invalid attendance status: ${status}`);
    }

    this.#id = id;
    this.#studentId = studentId;
    this.#subjectId = subjectId;
    this.#termId = termId;
    this.#date = attendanceDate.toISOString();
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

  set status(newStatus) {
    const allowedStatuses = ["P", "A", "L"];
    if (!allowedStatuses.includes(newStatus)) {
      throw new Error(`Invalid attendance status: ${newStatus}`);
    }
    this.#status = newStatus;
  }
}

export { Attendance };
