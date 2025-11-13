import { Term } from "../models/term.mjs";

class TermServices {
  #controller;

  constructor(termController) {
    this.#controller = termController;
  }

  createTerm(term) {
    try {
      // const start = new Date(term.startDate);
      // const end = new Date(term.endDate);

      // if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      //   throw new Error(
      //     "Invalid startDate or endDate format (must be ISO string)"
      //   );
      // }

      // if (start >= end || start <= Date.now()) {
      //   throw new Error("startDate must be earlier than endDate and after or equal to current date");
      // }

      const termModel = new Term(null, term.name, term.startDate, term.endDate);

      this.#controller.add(termModel);
      return `Student "${termModel.name} ${termModel.startDate} ${termModel.endDate}" created successfully!`;
    } catch (err) {
      return err.message;
    }
  }
}

export { TermServices };
