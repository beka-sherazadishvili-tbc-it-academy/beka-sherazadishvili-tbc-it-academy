import { CommonController } from "./commonController.mjs";
import { GradingScheme } from "../models/gradingScheme.mjs";

class GradingSchemeController extends CommonController {
  constructor(filePath) {
    super(GradingScheme, filePath);
  }
}

export { GradingSchemeController };
