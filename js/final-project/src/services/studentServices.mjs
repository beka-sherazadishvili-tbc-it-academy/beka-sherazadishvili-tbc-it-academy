import { Meta } from "../models/helperModels/meta.mjs";
import { Student } from "../models/student.mjs";

class StudentService {
    #repo;

    constructor(studentRepo) {
        this.#repo = studentRepo;
    }

    createStudent(input) {
        try {
            const meta = new Meta(input.guardianName || null, input.email || null);
            const student = new Student(
                null,
                input.firstName,
                input.lastName,
                input.gradeLevel,
                meta
            );
            this.#repo.add(student);
            return `Student "${student.firstName} ${student.lastName} ${student.meta.email}" created successfully!`;
        } catch (error) {
            return error.message;
        }
    }
}

export { StudentService }