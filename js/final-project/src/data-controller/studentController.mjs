import { Student } from "../models/student.mjs";
import { CommonController } from "./commonController.mjs";

class StudentContoller extends CommonController {
    constructor() {
        super(Student)
    }
}

export { StudentContoller }