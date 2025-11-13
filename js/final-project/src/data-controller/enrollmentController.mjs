import { CommonController } from "./commonController.mjs";
import { Enrollment } from "../models/enrollment.mjs";

class EnrollmentController extends CommonController {
  constructor() {
    super(Enrollment);
  }

  add(item) {
    if (!(item instanceof Enrollment)) {
      throw new Error("Object is not an Enrollment instance");
    }

    const alreadyExist = [...this.getAllValues()].find(
      (enroll) => 
        enroll.studentId === item.studentId &&
        enroll.subjectId === item.subjectId &&
        enroll.termId === item.termId &&
        enroll.attemptNumber === item.attemptNumber &&
        enroll.status === 'active'
    );

    if(alreadyExist) {
        throw new Error(`${item} already exists`);
    }

    super.add(item);
  }
}

export { EnrollmentController }
