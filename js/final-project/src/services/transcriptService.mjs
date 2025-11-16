import { Policy } from "../models/policy.mjs";

class TranscriptService {
  #studentController;
  #subjectController;
  #termController;
  #enrollmentController;
  #assessmentController;
  #scoreController;
  #attendanceService;
  #calculationService;
  #gradingSchemeService;
  #policy;

  constructor(
    studentController,
    subjectController,
    termController,
    enrollmentController,
    assessmentController,
    scoreController,
    attendanceService,
    calculationService,
    gradingSchemeService
  ) {
    this.#studentController = studentController;
    this.#subjectController = subjectController;
    this.#termController = termController;
    this.#enrollmentController = enrollmentController;
    this.#assessmentController = assessmentController;
    this.#scoreController = scoreController;
    this.#attendanceService = attendanceService;
    this.#calculationService = calculationService;
    this.#gradingSchemeService = gradingSchemeService;
    this.#policy = new Policy();
  }

  getTranscript(studentId, schemeId) {
    try {
      const student = this.#studentController.getItemById(Number(studentId));
      if (!student) {
        throw new Error("NOT_FOUND: student does not exist");
      }

      const terms = this.#termController.getAllValues();

      const result = {
        student,
        terms: [],
        cumulativeGPA: null,
      };

      for (const term of terms) {
        const enrollments = this.#enrollmentController
          .getAllValues()
          .filter(
            (enroll) =>
              enroll.studentId === Number(studentId) &&
              enroll.termId === term.id
          );

        if (enrollments.length === 0) continue;

        const subjects = [];

        for (const enroll of enrollments) {
          const subject = this.#subjectController.getItemById(enroll.subjectId);

          const attendanceRate = this.#attendanceService.getAttendanceRate(
            studentId,
            subject.id,
            term.id
          );

          const finalPercent = this.#calculationService.finalPercentage(
            studentId,
            subject.id,
            term.id
          );

          const curvedPercent = this.#calculationService.curving(
            studentId,
            subject.id,
            term.id
          );

          let letter = null;
          let gpaPoints = null;

          if (subject.mode === "graded" && enroll.status === "completed") {
            letter = this.#gradingSchemeService.getLetter(
              curvedPercent,
              schemeId
            );
            gpaPoints = this.#gradingSchemeService.getGPA(letter, schemeId);
          }

          subjects.push({
            subjectId: subject.id,
            code: subject.code,
            name: subject.name,
            status: enroll.status,
            attendanceRate,
            finalPercent,
            curvedPercent,
            letter,
            gpaPoints,
          });
        }

        let termGPA = null;
        const hasCompletedGraded = enrollments.some((enroll) => {
          const subj = this.#subjectController.getItemById(enroll.subjectId);
          return (
            enroll.status === "completed" && subj && subj.mode === "graded"
          );
        });

        if (hasCompletedGraded) {
          termGPA = this.#calculationService.termGPA(
            studentId,
            term.id,
            schemeId
          );
        }

        const gradedCredits = enrollments
          .filter((enroll) => {
            const subj = this.#subjectController.getItemById(enroll.subjectId);
            return subj && subj.mode === "graded";
          })
          .reduce((sum, enroll) => {
            const subj = this.#subjectController.getItemById(enroll.subjectId);
            return sum + (subj?.creditHours || 0);
          }, 0);

        result.terms.push({
          termId: term.id,
          termName: term.name,
          subjects,
          termGPA,
          gradedCredits,
        });
      }

      result.cumulativeGPA = this.#calculationService.cumulativeGPA(
        studentId,
        schemeId
      );

      return result;
    } catch (err) {
      console.error("Error generating transcript:", err);
      return err.message;
    }
  }
}

export { TranscriptService };
