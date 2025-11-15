import { Enrollment } from "../models/enrollment.mjs";
import { Policy } from "../models/policy.mjs";

class EnrollmentService {
  #controller;
  #studentController;
  #subjectController;
  #termController;
  #assessments;
  #policy;

  constructor(
    enrollmentController,
    studentController,
    subjectController,
    termController,
    assessments
  ) {
    this.#controller = enrollmentController;
    this.#studentController = studentController;
    this.#subjectController = subjectController;
    this.#termController = termController;
    this.#assessments = assessments;
    this.#policy = new Policy();
  }

  createEnrollment(input) {
    try {
      const studentItem = this.#studentController.getItemById(input.studentId);
      const subjectItem = this.#subjectController.getItemById(input.subjectId);
      const termItem = this.#termController.getItemById(input.termId);

      if (!studentItem || !subjectItem || !termItem) {
        throw new Error(
          "Invalid entry: such student, subject or term does not exists"
        );
      }

      const isOverride = input.overdue.toLowerCase() === "y";
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
    } catch (err) {
      return err.message;
    }
  }

  updateEnrollment(input) {
    try {
      const enrollment = this.#controller.getItemById(input.enrollmentId);

      if (!enrollment) {
        throw new Error("VALIDATION_ERROR: Enrollment id does not exists");
      }

      if (enrollment.status !== "active") {
        throw new Error("VALIDATION_ERROR: Enrollmen status should be active");
      }

      const currentDate = new Date().toISOString();

      switch (input.action) {
        case "d":
          enrollment.droppedAt = currentDate;
          enrollment.status = "dropped";
          break;
        case "w":
          enrollment.droppedAt = currentDate;
          enrollment.status = "withdrawn";
          break;
        case "c":
          enrollment.droppedAt = currentDate;
          const isAuditPassed = this.#assessments.checkCurrentAudit(
            enrollment.subjectId,
            enrollment.termId
          );

          if (!isAuditPassed && !input.override) {
            throw new Error("VALIDATION_ERROR: audit failed");
          }

          if (input.markIncomplete) {
            this.#controller.update(enrollment.id, {
              ...enrollment,
              status: "completed", //TODO ask about this status
              completedAt: null,
              droppedAt: null,
            });
          } else {
            this.#controller.update(enrollment.id, {
              ...enrollment,
              status: "completed",
              completedAt: now,
              droppedAt: null,
            });
          }
          break;

        default:
          throw new Error("Unknown action");
      }

      return this.#controller.getItemById(enrollment.id).toJSON();
    } catch (err) {
      return err.message;
    }
  }
}

export { EnrollmentService };
