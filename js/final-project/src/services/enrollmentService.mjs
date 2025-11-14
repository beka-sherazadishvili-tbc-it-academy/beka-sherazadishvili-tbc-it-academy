import { Enrollment } from "../models/enrollment.mjs";
import { Policy } from "../models/policy.mjs";

class EnrollmentService {
  #controller;
  #studentController;
  #subjectController;
  #termController;
  #policy;

  constructor(
    enrollmentController,
    studentController,
    subjectController,
    termController
  ) {
    this.#controller = enrollmentController;
    this.#studentController = studentController;
    this.#subjectController = subjectController;
    this.#termController = termController;
    this.#policy = new Policy();
  }

  createEnrollment(input) {
    const studentItem = this.#studentController.getItemById(input.studentId);
    const subjectItem = this.#subjectController.getItemById(input.subjectId);
    const termItem = this.#termController.getItemById(input.termId);

    if (!studentItem || !subjectItem || !termItem) {
      throw new Error(
        "Invalid entry: such student, subject or term does not exists"
      );
    }

    const isOverride = input.overdue.toLowerCase() === 'y';
    const diffDays = Math.floor(
      (Date.now() - new Date(termItem.startDate)) / (1000 * 60 * 60 * 24)
    );

    if (diffDays > this.#policy.lateEnrollmentCutoff && !isOverride) {
      throw new Error(
        `You can not enroll, term started more than ${
          this.#policy.lateEnrollmentCutoff
        } days ago`
      );
    }

    const previousAttempts = this.#controller
      .getAllValues()
      .filter(
        (e) =>
          e.studentId === input.studentId && e.subjectId === input.subjectId
      )
      .map((e) => e.attemptNumber);

    const attemptNumber = previousAttempts.length
      ? Math.max(...previousAttempts) + 1
      : 1;

    const enrollment = new Enrollment(
      null,
      input.studentId,
      input.subjectId,
      input.termId,
      "active",
      attemptNumber,
      new Date().toISOString()
    );

    this.#controller.add(enrollment);

    return enrollment;
  }
}

export { EnrollmentService };
