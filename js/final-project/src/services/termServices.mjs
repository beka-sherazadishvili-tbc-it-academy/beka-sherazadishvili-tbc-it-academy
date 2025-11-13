import { Term } from "../models/term.mjs";

class TermServices {
  #controller;

  constructor(termController) {
    this.#controller = termController;
  }

  createTerm(term) {
    try {
      if (!/^\d{4}-[A-Za-z]+\d{1,2}$/.test(term.name)) {
        throw new Error(
          'Invalid term name format. Please enter something like "2025-S1" or "2025-F2"'
        );
      }

      const start = new Date(term.startDate);
      const end = new Date(term.endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error(
          "Invalid startDate or endDate format (must be ISO string)"
        );
      }

      if (start >= end) {
        throw new Error("startDate must be earlier than endDate");
      }

      const termModel = new Term(null, term.name, start, end);

      this.#controller.add(termModel);
      return `Student "${termModel.name} ${termModel.startDate} ${termModel.endDate}" created successfully!`;
    } catch (err) {
      return err.message;
    }
  }
}

export { TermServices };
