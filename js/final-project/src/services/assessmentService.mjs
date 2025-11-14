import { Assessment } from "../models/assessment.mjs";
import { Policy } from "../models/policy.mjs";

class AssessmentService {
  #controller;
  #subjectController;
  #termController;
  #policy;

  constructor(assessmentController, subjectController, termController) {
    this.#controller = assessmentController;
    this.#subjectController = subjectController;
    this.#termController = termController;
    this.#policy = new Policy();
  }

  createAssessment(input) {
    try {
      if (!this.#subjectController.getItemById(input.subjectId)) {
        throw new Error(
          `VALIDATION_ERROR: sibject with id - '${input.subjectId}' does not exists`
        );
      }

      const currentTerm = this.#termController.getItemById(input.termId);
      if (!currentTerm) {
        throw new Error(
          `VALIDATION_ERROR: term with id - ${input.termId} does not exists`
        );
      }

      const isNameExists = this.#controller
        .getAllValues()
        .find(
          (el) =>
            el.subjectId === Number(input.subjectId) &&
            el.termId == Number(input.termId) &&
            el.name.toLowerCase() === input.name.toLowerCase()
        );

      console.log(isNameExists);
      if (isNameExists) {
        throw new Error(`VALIDATION_ERROR: assessment with the '${input.name}' name already exists`);
      }

      if (input.dueDate) {
        const due = new Date(input.dueDate).getTime();
        const start = new Date(currentTerm.startDate).getTime();
        const end = new Date(currentTerm.endDate).getTime();

        if (due < start || due > end) {
          throw new Error("dueDate must be inside the term range");
        }
      }

      this.checkWeightAudit(input.subjectId, input.termId, input.weightPercent);

      const newAssessment = new Assessment(
        null,
        input.subjectId,
        input.termId,
        input.name,
        input.type,
        input.maxPoints,
        input.weightPercent,
        input.dueDate || null,
        input.locked.toLowerCase() === "y"
      );

      this.#controller.add(newAssessment);

      return newAssessment;
    } catch (err) {
      return err.message;
    }
  }

  checkWeightAudit(subjectId, termId, weightPercent) {
    const assessmentItems = this.#controller
      .getAllValues()
      .filter((item) => item.subjectId === subjectId && item.termId === termId);

    const toleranceSum =
      assessmentItems.reduce((acc, item) => acc + item.weightPercent, 0) +
      weightPercent;

    if (toleranceSum > 100 + this.#policy.weightTolerance) {
      throw new Error(
        `total tolerance shoould not be more than 100 +- ${
          this.#policy.weightTolerance
        }`
      );
    }
  }
}

export { AssessmentService };
