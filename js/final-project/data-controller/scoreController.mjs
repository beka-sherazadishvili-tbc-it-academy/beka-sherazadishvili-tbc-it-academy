import { Score } from "../models/score.mjs";
import { CommonController } from "./commonController.mjs";

class ScoreController extends CommonController {
    constructor(jsonPath) {
        super(Score, jsonPath)
    }
}

export { ScoreController }
