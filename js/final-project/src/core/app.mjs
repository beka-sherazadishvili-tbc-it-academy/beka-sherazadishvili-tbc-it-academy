import { StudentContoller } from "../data-controller/studentController.mjs";
import { StudentService } from "../services/studentServices.mjs";

export class App {
  #repos;
  #services;
  constructor() {
    this.#repos = {
      students: new StudentContoller(),
    };

    this.#services = {
      students: new StudentService(this.#repos.students),
    };
  }

  get repos() {
    return this.#repos;
  }

  get services() {
    return this.#services;
  }
}
