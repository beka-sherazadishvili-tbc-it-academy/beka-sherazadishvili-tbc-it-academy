class GradingSchemeService {
  #controller;

  constructor(controller) {
    this.#controller = controller;
  }

  getLetter(finalPercent, schemeId) {
    try {
      const scheme = this.#controller.getItemById(Number(schemeId));
      if (!scheme) {
        throw new Error("VALIDATION_ERROR: Invalid grading scheme");
      }

      for (const brPoint of scheme.breakpoints) {
        if (finalPercent >= brPoint.minPercent) return brPoint.letter;
      }

      return "F";
    } catch (err) {
      return err.message;
    }
  }

  getGPA(letter, schemeId) {
    try {
      const brPoint = this.#controller
        .getItemById(schemeId)
        .breakpoints.find((br) => br.letter === letter);

      return brPoint ? brPoint.gpaPoints : 0;
    } catch (err) {
      return err.message;
    }
  }
}

export { GradingSchemeService };
