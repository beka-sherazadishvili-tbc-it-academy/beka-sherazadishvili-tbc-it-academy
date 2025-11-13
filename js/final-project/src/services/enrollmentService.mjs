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

  createEnromlent(input) {
    const studentItem = this.#studentController.getById(input.studentId);
    const subjectItem = this.#subjectController.getById(input.subjectId);
    const termItem = this.#termController.getById(input.termId);

    if (!studentItem || !subjectItem || !termItem) {
      throw new Error(
        "Invalid entry: such student, subject or term does not exists"
      );
    }

    const diffDays = Math.floor(
      (Date.now() - new Date(termItem)) / (1000 * 60 * 60 * 24)
    );

    // if(diffDays > this.#policy.lateEnrollmentCutoff && )
  }
}
