import { Policy } from "../models/policy.mjs";

class CalculationServices {
  #subjectController;
  #enrollmentController;
  #assessmentController;
  #scoreController;
  #gradingSchemeService;
  #enrollmenService
  #policy;

  constructor(
    subjectController,
    enrollmentController,
    assessmentController,
    scoreController,
    gradingSchemeService,
    enrollmentService
  ) {
    this.#subjectController = subjectController;
    this.#enrollmentController = enrollmentController;
    this.#assessmentController = assessmentController;
    this.#scoreController = scoreController;
    this.#gradingSchemeService = gradingSchemeService;
    this.#enrollmenService = enrollmentService;
    this.#policy = new Policy();
  }

  finalPercentage(studentId, subjectId, termId) {
    try {
      const enroll = this.#enrollmentController
        .getAllValues()
        .find(
          (enroll) =>
            enroll.studentId === Number(studentId) &&
            enroll.subjectId === Number(subjectId) &&
            enroll.termId === Number(termId)
        );

      if (!enroll) {
        throw new Error(
          "NOT_FOUND: Student is not enrolled in this subject and term."
        );
      }

      const assessments = this.#assessmentController
        .getAllValues()
        .filter(
          (assess) =>
            assess.subjectId === Number(enroll.subjectId) &&
            assess.termId === Number(enroll.termId)
        );

      const currentDate = Date.now();
      let total = 0;

      for (let assess of assessments) {
        const score = this.#scoreController
          .getAllValues()
          .find(
            (score) =>
              score.studentId === enroll.studentId &&
              score.assessmentId === assess.id
          );

        const weight = assess.weightPercent;

        if (score) {
          const percent = (score.points / assess.maxPoints) * 100;
          const contribution = percent * (weight / 100);
          total += contribution;
          continue;
        }

        const due = assess.dueDate ? new Date(assess.dueDate).getTime() : null;

        if (!due) {
          continue;
        }

        if (dueDate > now) {
          continue;
        }

        if (currentDate > due && this.#policy.treatMissingAsZero) {
          total += 0 * (weight / 100);
          continue;
        }
      }

      return Number(total.toFixed(2));
    } catch (err) {
      return err.message;
    }
  }

  curving(studentId, subjectId, termId) {
    try {
      const finalPercent = this.finalPercentage(studentId, subjectId, termId);

      if (!finalPercent) {
        throw new Error("NOT_FOUNT: no final percent yet");
      }

      const curve = this.#policy.curve;

      switch (curve.type) {
        case "none":
          return finalPercent;

        case "linear":
          return Math.min(
            finalPercent + finalPercent * curve.addPercent,
            curve.maxCap
          );

        // case "percentile":
        //   return this.applyPercentileCurve(score, curve.distribution);

        default:
          return finalPercent;
      }
    } catch (err) {
      return err.message;
    }
  }

  GPAPoints(studentId, subjectId, termId, schemeId) {
    try {
      this.#enrollmentController.checkIncompleteExpiry();

      const percent = this.curving(studentId, subjectId, termId);

      const letter = this.#gradingSchemeService.getLetter(percent, schemeId);

      return this.#gradingSchemeService.getGPA(letter, schemeId);
    } catch (err) {
      return err.message;
    }
  }

  termGPA(studentId, termId, schemeId) {
    try {
      this.#enrollmenService.checkIncompleteExpiry();

      const enrollments = this.#enrollmentController
        .getAllValues()
        .filter((enroll) => {
          if (
            enroll.studentId !== Number(studentId) ||
            enroll.termId !== Number(termId) ||
            enroll.status !== "completed"
          ) {
            return false;
          }

          const subject = this.#subjectController.getItemById(enroll.subjectId);

          if (!subject) return false;

          return subject.mode !== "passfail";
        });

      if (enrollments.length === 0) {
        throw new Error("NOT_FOUND: so such enrolments");
      }

      let totalponits = 0;
      let totalCredits = 0;

      for (const enroll of enrollments) {
        const credits = this.#subjectController.getItemById(
          enroll.subjectId
        ).creditHours;

        const percent = this.curving(
          enroll.studentId,
          enroll.subjectId,
          enroll.termId
        );

        const letter = this.#gradingSchemeService.getLetter(percent, schemeId);

        const gpaPoints = this.#gradingSchemeService.getGPA(letter, schemeId);

        totalponits += gpaPoints * credits;
        totalCredits += credits;
      }

      return Number((totalponits / totalCredits).toFixed(2));
    } catch (err) {
      return err.message;
    }
  }

  cumulativeGPA(studentId, schemeId) {
    this.#enrollmentController.checkIncompleteExpiry();

    const enrollments = this.#enrollmentController
      .getAllValues()
      .filter((enroll) => {
        if (
          enroll.studentId !== Number(studentId) ||
          enroll.status !== "completed"
        ) {
          return false;
        }

        const subject = this.#subjectController.getItemById(enroll.subjectId);

        if (!subject) return false;

        return subject.mode !== "passfail";
      });

    if (enrollments.length === 0) {
      throw new Error("NOT_FOUND: no completed graded enrollments");
    }

    let totalPoints = 0;
    let totalCredits = 0;

    for (const enroll of enrollments) {
      const credits = this.#subjectController.getItemById(
        enroll.subjectId
      ).creditHours;

      const percent = this.curving(
        enroll.studentId,
        enroll.subjectId,
        enroll.termId
      );

      const letter = this.#gradingSchemeService.getLetter(percent, schemeId);
      const gpaPoints = this.#gradingSchemeService.getGPA(letter, schemeId);

      totalPoints += gpaPoints * credits;
      totalCredits += credits;
    }

    return Number((totalPoints / totalCredits).toFixed(2));
  }

  avg(arr) {
    return Number((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2));
  }

  median(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0)
      return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
    return Number(sorted[mid].toFixed(2));
  }

  stddev(arr) {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const variance =
      arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
    return Number(Math.sqrt(variance).toFixed(2));
  }
}

export { CalculationServices };
