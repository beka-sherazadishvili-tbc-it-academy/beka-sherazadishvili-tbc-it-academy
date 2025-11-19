import { Attendance } from "../models/attendance.mjs";
import { CommonController } from "./commonController.mjs";

class AttendanceControler extends CommonController {
    constructor(jsonPath) {
        super(Attendance, jsonPath);
    }
}

export { AttendanceControler }