import { isIntegerNumberValidator, isStringValidator, convertStringToNumber } from '../utils/validations.mjs';

class Score {
  constructor(
    id, 
    assessmentId,
    studentId, 
    points,
    recordedAt
) {
    //check integers
    id = convertStringToNumber(id);
    assessmentId = convertStringToNumber(assessmentId);
    studentId = convertStringToNumber(studentId);
    points = convertStringToNumber(points);
    isIntegerNumberValidator(id, assessmentId, studentId, points);

    if (points < 0) {
      throw new Error('points must be at least 0.');
    }

    //checking dates
    const date = new Date(dueDate);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid duedate format (must be ISO string)');
    }

    if (date.getTime() < Date.now()) {
        throw new Error('Due date must be in the future.');
    }

    this.id = id;
    this.assessmentId = assessmentId;
    this.studentId = studentId;
    this.points = points;
    this.recordedAt = recordedAt;
  }
}

export { Score }
