import { error } from "console";
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

  getTranscript(studentId) {
    const schemeId = 1;
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

  termRanking(termId, schemeId) {
    try {
      const term = this.#termController.getItemById(Number(termId));
      if (!term) {
        throw new Error("NOT_FOUND: term does not exist");
      }

      const allEnrollments = this.#enrollmentController.getAllValues();
      const termEnrollments = allEnrollments.filter((enroll) => {
        return (
          enroll.termId === Number(termId) && enroll.status === "completed"
        );
      });

      if (termEnrollments.length === 0) {
        throw new Error("NOT_FOUND: No completed enrollments in this term");
      }

      const students = [];

      for (const enroll of termEnrollments) {
        const studentId = enroll.studentId;

        let studentEntry = students.find((std) => std.studentId === studentId);

        if (!studentEntry) {
          studentEntry = {
            studentId: studentId,
            credits: 0,
            termGPA: 0,
          };
          students.push(studentEntry);
        }

        const subject = this.#subjectController.getItemById(enroll.subjectId);

        if (!subject || subject.mode === "passfail") {
          continue;
        }

        studentEntry.credits += subject.creditHours;
      }

      for (const std of students) {
        std.termGPA = this.#calculationService.termGPA(
          std.studentId,
          termId,
          schemeId
        );
      }

      const rankingList = students.map((std) => {
        const student = this.#studentController.getItemById(std.studentId);
        return {
          termGPA: std.termGPA,
          credits: std.credits,
          name: `${student.firstName} ${student.lastName}`,
          studentId: std.studentId,
        };
      });

      rankingList.sort((a, b) => {
        if (b.termGPA !== a.termGPA) {
          return b.termGPA - a.termGPA;
        }
        if (b.credits !== a.credits) {
          return b.credits - a.credits;
        }
        return a.name.localeCompare(b.name);
      });

      return rankingList;
    } catch (err) {
      return err.message;
    }
  }

  leaderBoard(subjectId, termId, limit = 10) {
    const subject = this.#subjectController.getItemById(Number(subjectId));
    if (!subject) {
      throw new Error("NOT_FOUND: subject does not exist");
    }

    const term = this.#termController.getItemById(Number(termId));
    if (!term) {
      throw new Error("NOT_FOUND: term does not exist");
    }

    const enrollments = this.#enrollmentController
      .getAllValues()
      .filter(
        (enroll) =>
          enroll.subjectId === Number(subjectId) &&
          enroll.termId === Number(termId) &&
          enroll.status === "completed"
      );

    if (enrollments.length === 0) {
      throw new Error("NOT_FOUND: No completed enrollments");
    }

    const Leaderboard = enrollments.map((enroll) => {
      const curvedPercent = this.#calculationService.curving(
        enroll.studentId,
        enroll.subjectId,
        enroll.termId
      );

      return { ...enroll.toJSON(), curvedPercent };
    });

    return Leaderboard.sort((a, b) => b.curvedPercent - a.curvedPercent).slice(
      0,
      limit
    );
  }
}

export { TranscriptService };
