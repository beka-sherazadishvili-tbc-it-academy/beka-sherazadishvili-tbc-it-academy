import { Term } from "../models/term.mjs";

class TermServices {
  #controller;

  constructor(termController) {
    this.#controller = termController;
  }

  createTerm(term) {
    try {
      const termModel = new Term(null, term.name, term.startDate, term.endDate);

      this.#controller.add(termModel);
      return `Student "${termModel.name} ${termModel.startDate} ${termModel.endDate}" created successfully!`;
    } catch (err) {
      return err.message;
    }
  }
}

export { TermServices };
