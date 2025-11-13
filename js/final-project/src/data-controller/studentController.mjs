import { Student } from "../models/student.mjs";
import { CommonController } from "./common-controller.mjs";

class StudentContoller extends CommonController {
    constructor() {
        super(Student)
    }
}

export { StudentContoller }