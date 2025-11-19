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
          "NOT_FOUND: such student, subject or term does not exists"
        );
      }

      const isOverride = input.overdue.toLowerCase() === "y";
      const diffDays = Math.floor(
        (Date.now() - new Date(termItem.startDate)) / (1000 * 60 * 60 * 24)
      );

      if (diffDays > this.#policy.lateEnrollmentCutoff && !isOverride) {
        throw new Error(
          `POLICY_VIOLATION: You can not enroll, term started more than ${
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

      return enrollment.toJSON();
    } catch (err) {
      return err.message;
    }
  }

  updateEnrollment(input) {
    try {
      const enrollment = this.#controller.getItemById(input.enrollmentId);

      if (!enrollment) {
        throw new Error("NOT_FOUND: Enrollment id does not exists");
      }

      if (enrollment.status !== "active") {
        throw new Error("VALIDATION_ERROR: enrollmen status should be active");
      }

      const currentDate = new Date().toISOString();

      switch (input.action) {
        case "d":
          enrollment.status = "dropped";
          this.#controller.update(enrollment.id, {
            ...enrollment,
            status: "dropped",
            completedAt: null,
            droppedAt: currentDate,
          });
          break;
        case "w":
          enrollment.droppedAt = currentDate;
          enrollment.status = "withdrawn";
          this.#controller.update(enrollment.id, {
            ...enrollment,
            status: "withdrawn",
            completedAt: null,
            droppedAt: currentDate,
          });
          break;
        case "c":
          enrollment.droppedAt = currentDate;
          const isAuditPassed = this.#assessments.checkCurrentAudit(
            enrollment.subjectId,
            enrollment.termId
          );

          if (input.markIncomplete) {
            this.#controller.update(enrollment.id, {
              ...enrollment,
              status: "Incomplete",
              completedAt: null,
              droppedAt: null,
            });
          } else {
            if (!isAuditPassed && !input.override) {
              throw new Error("VALIDATION_ERROR: audit failed");
            }
            this.#controller.update(enrollment.id, {
              ...enrollment,
              status: "completed",
              completedAt: currentDate,
              droppedAt: null,
            });
          }
          break;

        default:
          throw new Error("VALIDATION_ERROR: Unknown action");
      }

      return this.#controller.getItemById(enrollment.id).toJSON();
    } catch (err) {
      return err.message;
    }
  }

  checkIncompleteExpiry() {
    const allEnrollments = this.#controller.getAllValues();
    const currentDate = new Date();

    for (const enroll of allEnrollments) {
      if (enroll.status === "incomplete") {
        const expiryDate = new Date(enroll.completedAt || enroll.createdAt);
        expiryDate.setDate(
          expiryDate.getDate() +
            this.#policy.incompleteHandling.expiresAfterDays
        );

        if (currentDate > expiryDate) {
          this.#controller.update(enroll.id, {
            ...enroll,
            status: "F",
            droppedAt: currentDate.toISOString(),
          });
        }
      }
    }
  }
}

export { EnrollmentService };
