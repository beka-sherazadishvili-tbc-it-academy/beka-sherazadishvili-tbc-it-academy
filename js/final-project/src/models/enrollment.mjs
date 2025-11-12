import { isIntegerNumberValidator, isStringValidator, convertStringToNumber } from '../utils/validations.mjs';

class Enrollment {
  constructor(
    id, 
    studentId,
    subjectId,
    termId, 
    status,
    attemptNumber,
    createdAt,
    droppedAt = null,
    completedAt = null,
) {
    //check integers
    id = convertStringToNumber(id);
    studentId = convertStringToNumber(studentId);
    subjectId = convertStringToNumber(subjectId);
    termId = convertStringToNumber(termId);
    attemptNumber = convertStringToNumber(attemptNumber);
    isIntegerNumberValidator(id, studentId, subjectId, termId,attemptNumber);

    if (attemptNumber < 1) {
      throw new Error('attemptNumber must be at least 1.');
    }

    //checking strings
    isStringValidator(status);

    const allowedStatuses = ['active', 'dropped', 'completed', 'withdrawn'];
    if (!allowedStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }

    //checking dates
    const create = new Date(createdAt);

    if (isNaN(create.getTime())) {
      throw new Error('Invalid startDate or endDate format (must be ISO string)');
    }

    let drop = null;
    if (droppedAt) {
      drop = new Date(droppedAt);
      if (isNaN(drop.getTime())) {
        throw new Error('Invalid droppedAt format (must be ISO string)');
      }
    }

    let complete = null;
    if (completedAt) {
      complete = new Date(completedAt);
      if (isNaN(complete.getTime())) {
        throw new Error('Invalid completedAt format (must be ISO string)');
      }
    }

    //status and dates checking
    if (status === 'dropped' && !droppedAt) {
      throw new Error('droppedAt is required when status is "dropped"');
    }
    if (status === 'completed' && !completedAt) {
      throw new Error('completedAt is required when status is "completed"');
    }
    if ((status === 'active' || status === 'withdrawn') && (droppedAt || completedAt)) {
      throw new Error(`Status '${status}' should not have droppedAt or completedAt`);
    }

    this.id = id;
    this.studentId = studentId;
    this.subjectId = subjectId;
    this.termId = termId;
    this.status = status;
    this.attemptNumber = attemptNumber;
    this.createdAt = create.toISOString();
    this.droppedAt = drop ? drop.toISOString() : null;
    this.completedAt = complete ? complete.toISOString() : null;
  }
}

export { Enrollment }
