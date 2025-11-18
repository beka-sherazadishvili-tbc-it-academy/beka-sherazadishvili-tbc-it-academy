import { Term } from '../models/term.mjs'
import { CommonController } from './commonController.mjs';

class TermController extends CommonController {
  constructor(filePath) {
    super(Term, filePath);
  }

  add(item) {
    if (!(item instanceof Term)) {
      throw new Error(`VALIDATION_ERROR: Object is not Term instance`);
    }

    const alreadyExist = [...this.getAllValues()].find(
      (term) => term.name === item.name
    );

    if (alreadyExist) {
      throw new Error("VALIDATION_ERROR: name already exists");
    }

    super.add(item);
  }
}

export { TermController }
