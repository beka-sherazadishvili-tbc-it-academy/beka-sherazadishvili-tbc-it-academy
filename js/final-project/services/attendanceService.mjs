import { Attendance } from "../models/attendance.mjs";
import { Policy } from "../models/policy.mjs";

class AttendanceService {
  #controller;
  #studentController;
  #subjectController;
  #termController;
  #policy;

  constructor(
    attendanceService,
    studentController,
    subjectController,
    termController
  ) {
    (this.#controller = attendanceService),
      (this.#studentController = studentController),
      (this.#subjectController = subjectController),
      (this.#termController = termController);
    this.#policy = new Policy();
  }

  createAttendence(input) {
    try {
      const student = this.#studentController.getItemById(
        Number(input.studentId)
      );

      const subject = this.#subjectController.getItemById(
        Number(input.subjectId)
      );

      const term = this.#termController.getItemById(Number(input.termId));

      if (!student) {
        throw new Error("NOT_FOUND: this student does not exists");
      }

      if (!subject) {
        throw new Error("NOT_FOUND: this subject does not exists");
      }

      if (!term) {
        throw new Error("NOT_FOUND: this term does not exists");
      }

      const currentDate = new Date(input.date);
      const startDate = new Date(term.startDate);
      const endDate = new Date(term.endDate);

      if (currentDate < startDate || currentDate > endDate) {
        throw new Error("ILLEGAL_STATE: currendate is not in the terms");
      }

      const attendanceExists = this.#controller
        .getAllValues()
        .find(
          (att) =>
            att.studentId === Number(input.studentId) &&
            att.subjectId === Number(input.subjectId) &&
            att.termId === Number(input.termId) &&
            new Date(att.day).getTime() === currentDate.getTime()
        );

      if (attendanceExists) {
        throw new Error("CONFLICT: attendance already exists");
      }

      const newAttendance = new Attendance(
        null,
        Number(input.studentId),
        Number(input.subjectId),
        Number(input.termId),
        currentDate.toISOString(),
        input.status
      );

      this.#controller.add(newAttendance);
      return newAttendance.toJSON();
    } catch (err) {
      return err.message;
    }
  }

  getAttendanceRate(studentId, subjectId, termId) {
    try {
      const attendance = this.#controller
        .getAllValues()
        .filter(
          (att) =>
            att.studentId === Number(studentId) &&
            att.subjectId === Number(subjectId) &&
            att.termId === Number(termId)
        );

      if (attendance.length === 0) {
        throw new Error("NOT_FOUND: no such attandace items");
      }

      let totalPresent = 0;

      for (let record of attendance) {
        if (record.status === "P") {
          totalPresent += 1;
        } else if (record.status === "L") {
          totalPresent += this.#policy.lateAttendanceContribution;
        }
      }

      return ((totalPresent / attendance.length) * 100).toFixed(2);
    } catch (err) {
      return err.message;
    }
  }

  getAttendanceSummary(termId, subjectId = null) {
    try {
      if (!this.#termController.getItemById(Number(termId))) {
        throw new Error("NOT_FOUND: term does not exist");
      }

      let attendanceRecords = this.#controller
        .getAllValues()
        .filter((att) => att.termId === Number(termId));

      if (subjectId) {
        attendanceRecords = attendanceRecords.filter(
          (att) => att.subjectId === Number(subjectId)
        );
      }

      if (attendanceRecords.length === 0) {
        throw new Error("NOT_FOUND: no attendance for this term");
      }

      const grouped = new Map();

      for (const att of attendanceRecords) {
        const key = `${att.studentId}_${att.subjectId}`;

        if (!grouped.has(key)) {
          grouped.set(key, {
            studentId: att.studentId,
            subjectId: att.subjectId,
            total: 0,
            present: 0,
          });
        }

        const entry = grouped.get(key);
        entry.total += 1;

        if (att.status === "P") {
          entry.present += 1;
        } else if (att.status === "L") {
          entry.present += this.#policy.lateAttendanceContribution;
        }
      }

      const result = [];

      for (const entry of grouped.values()) {
        const rate = entry.total > 0 ? entry.present / entry.total : 0;

        result.push({
          studentId: entry.studentId,
          subjectId: entry.subjectId,
          attendanceRate: Number(rate.toFixed(4)),
          flagged: rate < this.#policy.attendanceThreshold,
        });
      }

      return result;
    } catch (err) {
      return err.message;
    }
  }
}

export { AttendanceService };
