import { StudentContoller } from "../data-controller/studentController.mjs";
import { SubjectController } from "../data-controller/subjectController.mjs";
import { TermController } from "../data-controller/termController.mjs";
import { StudentService } from "../services/studentServices.mjs";
import { SubjectServices } from "../services/subjectService.mjs";
import { TermServices } from "../services/termServices.mjs";

export class App {
  #controllers;
  #services;
  constructor() {
    this.#controllers = {
      students: new StudentContoller(),
      subjects: new SubjectController(),
      terms: new TermController(),
    };

    this.#services = {
      students: new StudentService(this.#controllers.students),
      subjects: new SubjectServices(this.#controllers.subjects),
      terms: new TermServices(this.#controllers.terms),
    };
  }

  get controllers() {
    return this.#controllers;
  }

  get services() {
    return this.#services;
  }
}
