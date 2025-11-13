import { Subject } from '../models/subject.mjs';

class SubjectServices {
    #controller;

    constructor(subjectController) {
        this.#controller = subjectController;
    }

    createSubcejt(subject) {
        try {
            if (subject.creditHours < 1) {
                throw new Error('VALIDATION_ERROR: credit hours cannot be less than one');
            }

            if (subject.mode !== 'graded' && subject.mode !== 'passfail') {
                throw new Error('VALIDATION_ERROR: mode must be "graded" or "passfail"');
            }

            const subjectModel = new Subject(
                null,
                subject.code,
                subject.name,
                subject.creditHours,
                subject.gradingSchemeId,
                subject.mode,
            );
            this.#controller.add(subjectModel);
            return `Student "${subjectModel.code} ${subjectModel.name} ${subjectModel.creditHours}" created successfully!`;
        } catch (err) {
            return err.message;
        }
    }
}

export { SubjectServices }