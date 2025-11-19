import { Policy } from "../models/policy.mjs";
import { Score } from "../models/score.mjs";

class ScoreService {
  #controller;
  #studentController;
  #assessmentController;
  #enrollmentController;
  #policy;

  constructor(
    scoreController,
    studentController,
    assessments,
    enrollmentController
  ) {
    this.#controller = scoreController;
    this.#studentController = studentController;
    this.#assessmentController = assessments;
    this.#enrollmentController = enrollmentController;
    this.#policy = new Policy();
  }

  addScore(input) {
    const assessment = this.#assessmentController.getItemById(
      Number(input.assessmentId)
    );

    const student = this.#studentController.getItemById(
      Number(input.studentId)
    );

    try {
      if (!student) {
        throw new Error("NOT_FOUND: this student does not exists");
      }

      if (!assessment) {
        throw new Error("NOT_FOUND: this student does not exists");
      }

      if (input.points < 0 || input.points > assessment.maxPoints) {
        throw new Error(
          `CONFLICT: score must be between 0 and ${assessment.maxPoints}`
        );
      }

      const subjectId = assessment.subjectId;
      const termId = assessment.termId;

      const isEnrolmentExists = this.#enrollmentController
        .getAllValues()
        .find(
          (item) =>
            item.studentId === Number(input.studentId) &&
            item.subjectId === Number(subjectId) &&
            item.termId === Number(termId) &&
            (item.status === "active" || item.status === "completed")
        );

      if (!isEnrolmentExists) {
        throw new Error(
          "NOT_FOUND: enrollment not found for this subject and term id"
        );
      }

      const existingScore = this.#controller
        .getAllValues()
        .find(
          (score) =>
            score.assessmentId === assessment.id &&
            score.studentId === student.id
        );

      const currentDate = new Date().toISOString();

      if (existingScore) {
        if (assessment.locked && this.#policy.allowScoreUpdateAfterLock) {
          throw new Error("POLICY_VIOLATION: score can not be updated");
        }

        existingScore.history.push({
          points: existingScore.points,
          recordedAt: existingScore.recordedAt,
        });

        const updatedScore = existingScore.toJSON();
        updatedScore.points = input.points;
        updatedScore.recordedAt = currentDate;

        this.#controller.update(existingScore.id, updatedScore);
        return existingScore;
      }

      const newScore = new Score(
        null,
        assessment.id,
        student.id,
        input.points,
        currentDate,
        []
      );

      this.#controller.add(newScore);
      return newScore;
    } catch (err) {
        return err.message;
    }
  }
}

export { ScoreService };
