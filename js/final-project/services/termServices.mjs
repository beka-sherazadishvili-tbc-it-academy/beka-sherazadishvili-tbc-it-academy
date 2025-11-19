import { Term } from "../models/term.mjs";

class TermServices {
  #controller;

  constructor(termController) {
    this.#controller = termController;
  }

  createTerm(term) {
    try {
      const termModel = new Term(null, term.name.toUpperCase(), term.startDate, term.endDate);

      this.#controller.add(termModel);
      return termModel.toJSON();
    } catch (err) {
      return err.message;
    }
  }
}

export { TermServices };
