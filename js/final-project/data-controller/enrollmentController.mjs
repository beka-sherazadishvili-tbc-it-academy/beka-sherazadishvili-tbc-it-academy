import { CommonController } from "./commonController.mjs";
import { Enrollment } from "../models/enrollment.mjs";

class EnrollmentController extends CommonController {
  constructor(jsonPath) {
    super(Enrollment, jsonPath);
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
        enroll.status === "active"
    );

    if (alreadyExist) {
      throw new Error(`CONFLICT: ${item} already exists`);
    }

    super.add(item);
  }

update(id, updates) {
  id = Number(id);

  const existing = this.getItemById(id);
  if (!existing) {
    throw new Error(
      "VALIDATION_ERROR: Enrollment with this ID does not exist"
    );
  }

  const updatedData = { ...existing.toJSON(), ...updates };
  
  this.getAllItems().set(id, Enrollment.fromJSON(updatedData));
  this._save();

  return updatedData;
}

}

export { EnrollmentController };
