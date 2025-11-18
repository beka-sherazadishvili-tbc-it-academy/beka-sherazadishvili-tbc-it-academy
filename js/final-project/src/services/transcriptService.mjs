import { error } from "console";
import { Policy } from "../models/policy.mjs";

class TranscriptService {
  #studentController;
  #subjectController;
  #termController;
  #enrollmentController;
  #attendanceService;
  #calculationService;
  #gradingSchemeService;
  #gradingSchemeController;
  #policy;

  constructor(
    studentController,
    subjectController,
    termController,
    enrollmentController,
    attendanceService,
    calculationService,
    gradingSchemeService,
    gradingSchemeController
  ) {
    this.#studentController = studentController;
    this.#subjectController = subjectController;
    this.#termController = termController;
    this.#enrollmentController = enrollmentController;
    this.#attendanceService = attendanceService;
    this.#calculationService = calculationService;
    this.#gradingSchemeService = gradingSchemeService;
    this.#gradingSchemeController = gradingSchemeController;
    this.#policy = new Policy();
  }

  getTranscript(studentId) {
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
          const schemeId = this.#gradingSchemeController.getItemById(
            student.gradingSchemeId
          );

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

  termRanking(termId) {
    const schemeId = 1;
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
          name: student.firstName,
          lastName: student.lastName,
          studentId: std.studentId,
        };
      });

      rankingList.sort((a, b) => {
        for (const tiebreaker of this.#policy.rankingTiebreakers) {
          const [field, direction] = tiebreaker.split(" ");
          let comparison = 0;

          switch (field) {
            case "GPA":
              comparison = a.termGPA - b.termGPA;
              break;
            case "totalEarnedCredits":
              comparison = a.credits - b.credits;
              break;
            case "lastName":
              comparison = a.lastName.localeCompare(b.lastName);
              break;
            case "firstName":
              comparison = a.firstName.localeCompare(b.firstName);
              break;
            case "id":
              comparison = a.studentId - b.studentId;
              break;
            default:
              continue;
          }

          if (direction === "desc") {
            comparison = -comparison;
          }

          if (comparison !== 0) {
            return comparison;
          }
        }

        return 0;
      });

      return rankingList;
    } catch (err) {
      return err.message;
    }
  }

  leaderBoard(subjectId, termId, limit = 10) {
    try {
      if (!this.#subjectController.getItemById(Number(subjectId))) {
        throw new Error("NOT_FOUND: subject does not exist");
      }

      if (!this.#termController.getItemById(Number(termId))) {
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

      return Leaderboard.sort(
        (a, b) => b.curvedPercent - a.curvedPercent
      ).slice(0, limit);
    } catch (err) {
      return err.message;
    }
  }

  gradeDistribution(subjectId, termId, buckets) {
    try {
      if (!this.#subjectController.getItemById(Number(subjectId))) {
        throw new Error("NOT_FOUND: subject does not exist");
      }

      if (!this.#termController.getItemById(Number(termId))) {
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

      const scores = enrollments.map((enroll) =>
        this.#calculationService.curving(
          enroll.studentId,
          enroll.subjectId,
          enroll.termId
        )
      );

      if (typeof buckets === "string") {
        buckets = buckets.split(",").map((bucket) => bucket.trim());
      }

      if (buckets.every((bucket) => /^[A-F][+-]?$/.test(bucket))) {
        const subject = this.#subjectController.getItemById(Number(subjectId));
        const grading = this.#gradingSchemeController.getItemById(
          Number(subject.gradingSchemeId)
        );

        let gradeDistribution = new Map();
        buckets.forEach((b) => gradeDistribution.set(b, 0));

        const filteredScores = [];

        for (const score of scores) {
          const letter = this.#gradingSchemeService.getLetter(
            score,
            grading.id
          );

          if (gradeDistribution.has(letter)) {
            gradeDistribution.set(letter, gradeDistribution.get(letter) + 1);
            filteredScores.push(score);
          }
        }

        return {
          buckets: gradeDistribution,
          average: filteredScores.length
            ? this.#calculationService.avg(filteredScores)
            : null,
          median: filteredScores.length
            ? this.#calculationService.median(filteredScores)
            : null,
          stddev: filteredScores.length
            ? this.#calculationService.stddev(filteredScores)
            : null,
        };
      }

      if (buckets.every((bucket) => /^\d+\-\d+$/.test(bucket))) {
        let gradeDistribution = new Map();
        buckets.forEach((b) => gradeDistribution.set(b, 0));

        const filteredScores = [];

        for (const score of scores) {
          for (const bucket of buckets) {
            const [min, max] = bucket.split("-").map(Number);

            if (score >= min && score <= max) {
              gradeDistribution.set(bucket, gradeDistribution.get(bucket) + 1);
              filteredScores.push(score);
              break;
            }
          }
        }

        return {
          buckets: gradeDistribution,
          average: filteredScores.length
            ? this.#calculationService.avg(filteredScores)
            : null,
          median: filteredScores.length
            ? this.#calculationService.median(filteredScores)
            : null,
          stddev: filteredScores.length
            ? this.#calculationService.stddev(filteredScores)
            : null,
        };
      }

      throw new Error(
        "VALIDATION_ERROR: use letters (A,B+) or numeric ranges (80-90)."
      );
    } catch (err) {
      return err.message;
    }
  }
}

export { TranscriptService };
