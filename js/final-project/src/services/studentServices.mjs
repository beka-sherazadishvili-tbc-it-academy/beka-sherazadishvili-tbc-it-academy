import { Meta } from "../models/helperModels/meta.mjs";
import { Student } from "../models/student.mjs";

class StudentService {
    #controller;

    constructor(studentController) {
        this.#controller = studentController;
    }

    createStudent(student) {
        try {
            const meta = new Meta(student.guardianName || null, student.email || null);
            const studentModel = new Student(
                null,
                student.firstName,
                student.lastName,
                student.gradeLevel,
                meta
            );
            this.#controller.add(studentModel);
            console.log(this.#controller.getAllItems())
            return `Student "${studentModel.firstName} ${studentModel.lastName} ${studentModel.meta.email}" created successfully!`;
        } catch (error) {
            return error.message;
        }
    }
}

export { StudentService }