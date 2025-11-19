import { Student } from "../models/student.mjs";
import { CommonController } from "./commonController.mjs";

class StudentContoller extends CommonController {
    constructor(filePath) {
        super(Student, filePath)
    }
}

export { StudentContoller }