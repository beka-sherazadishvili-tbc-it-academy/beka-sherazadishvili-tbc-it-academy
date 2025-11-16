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
            enroll.studentId === Number(studentId) && enroll.termId === term.id
        );

      if (enrollments.length === 0) continue;

      const subjects = [];

      for (const enroll of enrollments) {
        const subject = this.#subjectController.getItemById(enroll.subjectId);
        let attendanceRate = null;
        let finalPercent = null;
        let curvedPercent = null;
        let letter = null;
        let gpaPoints = null;

        try {
          console.log(studentId);
          console.log(subject.id);
          console.log(term.id)
          attendanceRate = this.#attendanceService.getAttendanceRate(
            studentId,
            subject.id,
            term.id
          );
        } catch (err) {
          return err.message
        }

        try {
          finalPercent = this.#calculationService.finalPercentage(
            studentId,
            subject.id,
            term.id
          );
        } catch (err) {
          return err.message;
        }

        try {
          curvedPercent = this.#calculationService.curving(
            studentId,
            subject.id,
            term.id
          );
        } catch (err) {
          return err.message;
        }

        if (subject.mode === "graded" && enroll.status === "completed") {
          try {
            letter = this.#gradingSchemeService.getLetter(curvedPercent, schemeId);
            gpaPoints = this.#gradingSchemeService.getGPA(letter, schemeId);
          } catch (err) {
            return err.message
          }
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
      try {
        termGPA = this.#calculationService.termGPA(
          studentId,
          term.id,
          schemeId
        );
      } catch (err) {
        return err.message
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

    try {
      result.cumulativeGPA = this.#calculationService.cumulativeGPA(
        studentId,
        schemeId
      );
    } catch (err) {
      return err.message;
    }

    return result;
  }
}

export { TranscriptService };
