import { Subject } from "../models/subject.mjs";
import { CommonController } from "./common-controller.mjs";

class SubjectController extends CommonController {
  constructor() {
    super(Subject);
  }

  add(item) {
    if (!(item instanceof Subject)) {
      throw new Error(`Object is not subject instance`);
    }

    const alreadyExist = [...this.getAllValues()].find(
        subject => subject.code === item.code
    )

    if(alreadyExist) {
        throw new Error('code already exists');
    }

    super.add(item)
  }
}

export { SubjectController };
