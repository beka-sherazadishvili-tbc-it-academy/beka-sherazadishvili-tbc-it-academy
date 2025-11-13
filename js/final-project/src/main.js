import readline from "readline";
import { App } from "./core/app.mjs";
import { validationQuestion } from "./utils/validationQuestion.mjs";
import { commonValidators, studentValidator } from "./utils/questionValidators.mjs";

const createStd = new App();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mainMenu() {
  console.log("\n=== School SIS ===");
  console.log("1) Create Student");
  console.log("2) Create Subject");
  console.log("3) Create Term");
  console.log("4) Enroll Student");
  console.log("0) Exit");
  rl.question("> ", async (choice) => {
    switch (choice) {
      case "1":
        await createStudent();
        break;
      case "2":
        await createSubject();
        break;
      case "3":
        await createTerm();
        break;
      case "0":
        rl.close();
        return;
    }
    mainMenu();
  });
}

//1. create student
async function createStudent() {
  const firstName = await validationQuestion(
    rl,
    "First name: ",
    commonValidators.nonEmptyString("First name")
  );

  const lastName = await validationQuestion(
    rl,
    "Last name: ",
    commonValidators.nonEmptyString("Last name")
  );

  const gradeLevel = await validationQuestion(
    rl,
    "Grade level: ",
    commonValidators.gradeLevel()
  );

  let email = await validationQuestion(
    rl,
    "Email (optional, press Enter to skip): ",
    studentValidator.email()
  );

  let guardianName = await validationQuestion(
    rl,
    "Guardian name (optional, press Enter to skip): ",
    commonValidators.optionalString()
  );

  const result = createStd.services.students.createStudent({
    firstName,
    lastName,
    gradeLevel,
    email: email.trim() || null,
    guardianName: guardianName.trim() || null,
  });
  console.log(result);
}

//2. create subject
async function createSubject() {
  rl.question("Subject code: ", (code) => {
    rl.question("Subject name: ", (name) => {
      rl.question("Credit hours: ", (creditHours) => {
        rl.question("grading Scheme Id : ", (gradingSchemeId) => {
          rl.question("mode : ", (mode) => {
            const result = createStd.services.subjects.createSubcejt({
              code,
              name,
              creditHours,
              gradingSchemeId,
              mode,
            });
            console.log(result);

            mainMenu();
          });
        });
      });
    });
  });
}

//3. create term
async function createTerm() {
  rl.question("Term name: ", (name) => {
    rl.question("Term start date : ", (startDate) => {
      rl.question("Term end date : ", (endDate) => {
        const result = createStd.services.terms.createTerm({
          name,
          startDate,
          endDate,
        });
        console.log(result);

        mainMenu();
      });
    });
  });
}

mainMenu();
