import { Attendance } from "../models/attendance.mjs";

class AttendanceService {
  #controller;
  #studentController;
  #subjectController;
  #termController;

  constructor(
    attendanceService,
    studentController,
    subjectController,
    termController
  ) {
    this.#controller = attendanceService,
    this.#studentController = studentController,
    this.#subjectController = subjectController,
    this.#termController = termController;
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
        throw new Error("VALIDATION_ERROR: this student does not exists");
      }

      if (!subject) {
        throw new Error("VALIDATION_ERROR: this subject does not exists");
      }

      if (!term) {
        throw new Error("VALIDATION_ERROR: this term does not exists");
      }

      const currentDate = new Date(input.date);
      const startDate = new Date(term.startDate);
      const endDate = new Date(term.endDate);

      if (currentDate < startDate || currentDate > endDate) {
        throw new Error("VALIDATION_ERROR: currendate is not in the terms");
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
        throw new Error("VALIDATION_ERROR: attendance already exists");
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
      return newAttendance;
    } catch (err) {
      return err.message;
    }
  }
}

export { AttendanceService };
