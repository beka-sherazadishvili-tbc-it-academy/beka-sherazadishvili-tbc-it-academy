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
    };

    this.#services = {
      students: new StudentService(this.#controllers.students),
      subjects: new SubjectServices(this.#controllers.subjects),
      terms: new TermServices(this.#controllers.terms),
      enrollments: new EnrollmentService(
        this.#controllers.enrollments,
        this.#controllers.students,
        this.#controllers.subjects,
        this.#controllers.terms
      ),
    };
  }

  get controllers() {
    return this.#controllers;
  }

  get services() {
    return this.#services;
  }
}
