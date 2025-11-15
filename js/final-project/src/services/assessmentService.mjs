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

      if (isNameExists) {
        throw new Error(
          `VALIDATION_ERROR: assessment with the '${input.name}' name already exists`
        );
      }

      if (input.dueDate) {
        const due = new Date(input.dueDate).getTime();
        const start = new Date(currentTerm.startDate).getTime();
        const end = new Date(currentTerm.endDate).getTime();

        if (due < start || due > end) {
          throw new Error(
            "VALIDATION_ERROR: dueDate must be inside the term range"
          );
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

  updateAssessment(input) {
    try {
      const assessmentToUpdate = this.#controller.getItemById(
        Number(input.id)
      );
      if (!assessmentToUpdate) {
        throw new Error(
          `VALIDATION_ERROR: Assessment id ${input.id} not found`
        );
      }

      const fieldNotAllowed = [
        "name",
        "type",
        "maxPoints",
        "weightPercent",
        "dueDate",
      ];

      if (assessmentToUpdate.locked) {
        for (let filed of fieldNotAllowed) {
          if (
            input[filed] !== undefined &&
            input[filed] !== assessmentToUpdate[filed]
          ) {
            throw new Error(
              `VALIDATION_ERROR: cannot modify '${filed}' because assessment is locked`
            );
          }
        }
      }

      if (input.name && input.name !== assessmentToUpdate.name) {
        const isNameExists = this.#controller
          .getAllValues()
          .find(
            (el) =>
              el.id !== Number(assessmentToUpdate.id) &&
              el.subjectId === Number(input.subjectId) &&
              el.termId == Number(input.termId) &&
              el.name.toLowerCase() === input.name.toLowerCase()
          );

        if (isNameExists) {
          throw new Error(
            `VALIDATION_ERROR: assessment with the '${input.name}' name already exists`
          );
        }
      }

      if (input.dueDate) {
        const currentTerm = this.#termController.getItemById(assessmentToUpdate.termId);
        const due = new Date(input.dueDate).getTime();
        const start = new Date(currentTerm.startDate).getTime();
        const end = new Date(currentTerm.endDate).getTime();

        if (due < start || due > end) {
          throw new Error(
            "VALIDATION_ERROR: dueDate must be inside the term range"
          );
        }
      }

      if (
        input.weightPercent !== undefined &&
        input.weightPercent !== assessmentToUpdate.weightPercent
      ) {
        this.checkWeightAudit(
          assessmentToUpdate.subjectId,
          assessmentToUpdate.termId,
          input.weightPercent,
          assessmentToUpdate.id
        );
      }

      this.#controller.update(
        assessmentToUpdate.id,
        { ...assessmentToUpdate.toJSON(), ...input },
      );

      return this.#controller.getItemById(assessmentToUpdate.id);
    } catch (err) {
      return err.message;
    }
  }

  deleteAssessment(id) {
    try {
      if (!this.#controller.getItemById(Number(id))) {
        throw new Error(
          `VALIDATION_ERROR: assessment with id - ${id} not found`
        );
      }

      this.#controller.delete(id);
      return `Assessment ${id} deleted`;
    } catch (err) {
      return err.message;
    }
  }

  checkWeightAudit(subjectId, termId, weightPercent, updatingId = null) {
    const assessmentItems = this.#controller
      .getAllValues()
      .filter((item) => item.subjectId === subjectId && item.termId === termId);

    const toleranceSum =
      assessmentItems.reduce(
        (acc, item) =>
          item.id === updatingId ? acc : acc + item.weightPercent,
        0
      ) + weightPercent;

    if (Math.abs(toleranceSum - 100) > this.#policy.weightTolerance) {
      throw new Error(
        `total tolerance shoould not be more than 100 +- ${
          this.#policy.weightTolerance
        }`
      );
    }
  }

  checkCurrentAudit(subjectId, termId) {
    const assessmentItems = this.#controller
      .getAllValues()
      .filter((item) => item.subjectId === subjectId && item.termId === termId);

    if (assessmentItems.length === 0) {
      return false;
    }

    const toleranceSum = assessmentItems.reduce(
      (acc, item) => acc + item.weightPercent, 0);

    return Math.abs(toleranceSum - 100) <= this.#policy.weightTolerance;
  }
}

export { AssessmentService };
