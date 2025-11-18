import { Subject } from '../models/subject.mjs';

class SubjectServices {
    #controller;

    constructor(subjectController) {
        this.#controller = subjectController;
    }

    createSubcejt(subject) {
        try {
            const subjectModel = new Subject(
                null,
                subject.code.toUpperCase(),
                subject.name,
                subject.creditHours,
                subject.gradingSchemeId,
                subject.mode,
            );
            this.#controller.add(subjectModel);
            return subjectModel.toJSON();
        } catch (err) {
            return err.message;
        }
    }
}

export { SubjectServices }