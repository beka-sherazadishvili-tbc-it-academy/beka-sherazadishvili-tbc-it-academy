import readline from 'readline';
import { App } from './core/app.mjs';
import { validationQuestion } from './utils/validationQuestion.mjs';
import {
  commonValidators,
  studentValidator,
  subjectValidator,
  termValidator,
} from './utils/questionValidators.mjs';

const createStd = new App();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mainMenu() {
  console.log('\n--- School SIS ---');
  console.log('1) Create Student');
  console.log('2) Create Subject');
  console.log('3) Create Term');
  console.log('4) Enroll Student');
  console.log('0) Exit');
  rl.question('> ', async (choice) => {
    switch (choice) {
      case '1':
        await createStudent();
        break;
      case '2':
        await createSubject();
        break;
      case '3':
        await createTerm();
        break;
      case '4':
        await createEnromlent();
        break;
      case '0':
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
    'First name: ',
    commonValidators.nonEmptyString('First name')
  );

  const lastName = await validationQuestion(
    rl,
    'Last name: ',
    commonValidators.nonEmptyString('Last name')
  );

  const gradeLevel = await validationQuestion(
    rl,
    'Grade level: ',
    commonValidators.nonEmptyString('Grade level')
  );

  let email = await validationQuestion(
    rl,
    'Email (optional, press Enter to skip): ',
    studentValidator.email()
  );

  let guardianName = await validationQuestion(
    rl,
    'Guardian name (optional, press Enter to skip): ',
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
  const code = await validationQuestion(
    rl,
    'Subject code: ',
    commonValidators.nonEmptyString('Subject code')
  );

  const name = await validationQuestion(
    rl,
    'Subject name: ',
    commonValidators.nonEmptyString('Subject name')
  );

  const creditHours = await validationQuestion(
    rl,
    'Credit hours: ',
    subjectValidator.creditHours('Credit hours')
  );

  const gradingSchemeId = await validationQuestion(
    rl,
    'grading Scheme Id: ',
    commonValidators.nonEmptyString('grading Scheme Id')
  );

  const mode = await validationQuestion(
    rl,
    'mode: ',
    commonValidators.checkMode('mode')
  );

  const result = createStd.services.subjects.createSubcejt({
    code,
    name,
    creditHours,
    gradingSchemeId,
    mode,
  });
  console.log(result);
}

//3. create term
async function createTerm() {
  const name = await validationQuestion(
    rl,
    'Term name: ',
    termValidator.checkTermName('Term name')
  );

  const startDate = await validationQuestion(
    rl,
    'Term start date: ',
    commonValidators.date('Term start date')
  );

  const endDate = await validationQuestion(
    rl,
    'Term end date: ',
    commonValidators.dateAfter('Term end date', startDate)
  );

  const result = createStd.services.terms.createTerm({
    name,
    startDate,
    endDate,
  });
  console.log(result);
}

//4. create enrollment
async function createEnromlent() {
  const studentId = await validationQuestion(
    rl,
    'Student Id: ',
    commonValidators.integerNumber('Student Id')
  );

  const subjectId = await validationQuestion(
    rl,
    'Subject Id: ',
    commonValidators.integerNumber('Subject Id')
  );

  const termId = await validationQuestion(
    rl,
    'Term Id: ',
    commonValidators.integerNumber('Term Id')
  );

  const status = await validationQuestion(
    rl,
    'Status: ',
    commonValidators.nonEmptyString('Status')
  );

  const overdue = await validationQuestion(
    rl,
    'Term end date: ',
    commonValidators.nonEmptyString('Term end date')
  );

  const result = createStd.services.terms.createTerm({
    studentId,
    subjectId,
    termId,
    status,
    overdue
  });
  console.log(result);
}

mainMenu();
