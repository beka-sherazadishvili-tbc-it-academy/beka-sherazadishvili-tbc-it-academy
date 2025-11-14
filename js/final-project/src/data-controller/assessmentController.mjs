import { Assessment } from "../models/assessment.mjs";
import { CommonController } from "./commonController.mjs";

class AssessmentController extends CommonController {
  constructor(jsonPath) {
    super(Assessment, jsonPath);
  }

  // add(item) {
  //     const alreadyExist = [...this.getAllValues()].find(
  //       (el) => el.name === item.name
  //     );

  //     if (alreadyExist) {
  //       throw new Error("name already exists");
  //     }

  //     super.add(item);
  // }
}

export { AssessmentController };
