import { Assessment } from "../models/assessment.mjs";
import { CommonController } from "./commonController.mjs";

class AssessmentController extends CommonController {
  constructor(jsonPath) {
    super(Assessment, jsonPath);
  }
}

export { AssessmentController };
