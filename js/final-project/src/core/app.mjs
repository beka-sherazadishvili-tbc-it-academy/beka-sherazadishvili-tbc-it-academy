import path from "path";
import { fileURLToPath } from "url";
import { StudentContoller } from "../data-controller/studentController.mjs";
import { SubjectController } from "../data-controller/subjectController.mjs";
import { TermController } from "../data-controller/termController.mjs";
import { StudentService } from "../services/studentServices.mjs";
import { SubjectServices } from "../services/subjectService.mjs";
import { TermServices } from "../services/termServices.mjs";
import { EnrollmentController } from "../data-controller/enrollmentController.mjs";
import { EnrollmentService } from "../services/enrollmentService.mjs";
import { AssessmentController } from "../data-controller/assessmentController.mjs";
import { AssessmentService } from "../services/assessmentService.mjs";
import { ScoreController } from "../data-controller/scoreController.mjs";
import { ScoreService } from "../services/scoreService.mjs";
import { AttendanceControler } from "../data-controller/attendanceController.mjs";
import { AttendanceService } from "../services/attendanceService.mjs";
import { TranscriptService } from "../services/transcriptService.mjs";
import { CalculationServices } from "../services/calculationServices.mjs";
import { GradingSchemeController } from "../data-controller/gradingChemeController.mjs";
import { GradingSchemeService } from "../services/gradingSchemeService.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class App {
  #controllers;
  #services;
  constructor() {
    const base = path.join(__dirname, "..", "data");

    this.#controllers = {
      students: new StudentContoller(`${base}/students.json`),
      subjects: new SubjectController(`${base}/subject.json`),
      terms: new TermController(`${base}/term.json`),
      enrollments: new EnrollmentController(`${base}/enrollment.json`),
      assessments: new AssessmentController(`${base}/assessment.json`),
      scores: new ScoreController(`${base}/scores.json`),
      attendances: new AttendanceControler(`${base}/attendance.json`),
      gradingSchemes: new GradingSchemeController(`${base}/grading.json`),
    };

    this.#services = {};

    this.#services.students = new StudentService(this.#controllers.students);
    this.#services.subjects = new SubjectServices(this.#controllers.subjects);
    this.#services.terms = new TermServices(this.#controllers.terms);

    this.#services.assessments = new AssessmentService(
      this.#controllers.assessments,
      this.#controllers.subjects,
      this.#controllers.terms
    );

    this.#services.enrollments = new EnrollmentService(
      this.#controllers.enrollments,
      this.#controllers.students,
      this.#controllers.subjects,
      this.#controllers.terms,
      this.#services.assessments
    );

    this.#services.scores = new ScoreService(
      this.#controllers.scores,
      this.#controllers.students,
      this.#controllers.assessments,
      this.#controllers.enrollments
    );

    this.#services.attendances = new AttendanceService(
      this.#controllers.attendances,
      this.#controllers.students,
      this.#controllers.subjects,
      this.#controllers.terms
    );

    this.#services.gradingSchemes = new GradingSchemeService(
      this.#controllers.gradingSchemes
    );

    this.#services.calculations = new CalculationServices(
      this.#controllers.students,
      this.#controllers.subjects,
      this.#controllers.terms,
      this.#controllers.enrollments,
      this.#controllers.assessments,
      this.#controllers.scores,
      this.#controllers.attendances,
      this.#services.gradingSchemes
    );

    this.#services.transcripts = new TranscriptService(
      this.#controllers.students,
      this.#controllers.subjects,
      this.#controllers.terms,
      this.#controllers.enrollments,
      this.#services.attendances,
      this.#services.calculations,
      this.#services.gradingSchemes,
      this.#controllers.gradingSchemes
    );
  }

  get controllers() {
    return this.#controllers;
  }

  get services() {
    return this.#services;
  }
}
