import { isIntegerNumberValidator, isStringValidator, convertStringToNumber } from '../utils/validations.mjs';

class Assessment {
  constructor(
    id, 
    subjectId,
    termId, 
    name,
    type,
    maxPoints,
    weightPercent,
    dueDate,
    locked = false,
) {
    //check integers
    id = convertStringToNumber(id);
    subjectId = convertStringToNumber(subjectId);
    termId = convertStringToNumber(termId);
    maxPoints = convertStringToNumber(maxPoints);
    weightPercent = convertStringToNumber(weightPercent);
    isIntegerNumberValidator(id, subjectId, termId, maxPoints, weightPercent);

    if (maxPoints < 0) {
      throw new Error('maxpoint must be at least 0.');
    }

    if(weightPercent < 0 || weightPercent > 100) {
        throw new Error('weight percent should be bwteen 0 and 100')
    }

    //checking strings
    isStringValidator(name, type);

    const allowedTypes = ['quiz', 'exam', 'project'];
    if (!allowedTypes.includes(type)) {
      throw new Error(`Invalid status: ${type}`);
    }

    //checking dates
    const date = new Date(dueDate);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid duedate format (must be ISO string)');
    }

    if (date.getTime() < Date.now()) {
        throw new Error('Due date must be in the future.');
    }

    //checking booleans
    if(typeof locked !== 'boolean') {
        throw new Error('should be boolean type');
    }

    this.id = id;
    this.subjectId = subjectId;
    this.termId = termId;
    this.name = name;
    this.type = type;
    this.maxPoints = maxPoints;
    this.weightPercent = weightPercent
    this.dueDate = date.toISOString();
    this.locked = locked;
  }
}

export { Assessment }
