import { StudentContoller } from "../data-controller/studentController.mjs";
import { SubjectController } from "../data-controller/subjectController.mjs";
import { StudentService } from "../services/studentServices.mjs";
import { SubjectServices } from "../services/subjectService.mjs";

export class App {
  #controllers;
  #services;
  constructor() {
    this.#controllers = {
      students: new StudentContoller(),
      subjects: new SubjectController(),
    };

    this.#services = {
      students: new StudentService(this.#controllers.students),
      subjects: new SubjectServices(this.#controllers.subjects)
    };
  }

  get controllers() {
    return this.#controllers;
  }

  get services() {
    return this.#services;
  }
}
