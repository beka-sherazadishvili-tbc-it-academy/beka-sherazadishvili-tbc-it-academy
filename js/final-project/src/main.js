import readline from "readline";
import { App } from "./core/app.mjs";
import { validationQuestion } from "./utils/validationQuestion.mjs";
import {
  assessmentValidation,
  commonValidators,
  studentValidator,
  subjectValidator,
  termValidator,
} from "./utils/questionValidators.mjs";

const createStd = new App();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function studentMenu() {
  console.log("\n--- School SIS ---");
  console.log("1) Create Student");
  console.log("2) Create Subject");
  console.log("3) Create Term");
  console.log("4) Enroll Student");
  console.log("5) Drop / Withdraw / Complete");
  console.log("6) Create / Update / Delete Assessment");
  console.log("7) Record Score");
  console.log("8) Record Attendance");
  console.log("9) Transcript (by student)");
  console.log("10) Term Ranking");
  console.log("11) Subject Leaderboard");
  console.log("12) Grade Distribution");
  console.log("13) Attendance Summary");
  console.log("14) Update Policy / Curve / Retake");
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
      case "4":
        await createEnrollment();
        break;
      case "5":
        await updateEnrollment();
        break;
      case "6":
        await assessments();
        break;
      case "7":
        await recordScore();
        break;
      case "8":
        await recordAttendance();
        break;
      case "9":
        await transcriptByStudent();
        break;
      case "10":
        await termRanking();
        break;
      case "11":
        await leaderBoard();
        break;
      case "12":
        await gradeDistribution();
        break;
      case "13":
        await attendanceSummary();
        break;
      case "14":
        await updatePolicy();
        break;
      case "0":
        rl.close();
        return;
    }
    studentMenu();
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
    commonValidators.nonEmptyValue("Grade level")
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
  const code = await validationQuestion(
    rl,
    "Subject code: ",
    commonValidators.nonEmptyString("Subject code")
  );

  const name = await validationQuestion(
    rl,
    "Subject name: ",
    commonValidators.nonEmptyString("Subject name")
  );

  const creditHours = await validationQuestion(
    rl,
    "Credit hours: ",
    subjectValidator.creditHours("Credit hours")
  );

  const gradingSchemeId = await validationQuestion(
    rl,
    "grading Scheme Id: ",
    commonValidators.integerNumber("grading Scheme Id")
  );

  const mode = await validationQuestion(
    rl,
    "mode: ",
    subjectValidator.checkMode("mode")
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
    "Term name: ",
    termValidator.checkTermName("Term name")
  );

  const startDate = await validationQuestion(
    rl,
    "Term start date: ",
    commonValidators.date("Term start date")
  );

  const endDate = await validationQuestion(
    rl,
    "Term end date: ",
    commonValidators.dateAfter("Term end date", startDate)
  );

  const result = createStd.services.terms.createTerm({
    name,
    startDate,
    endDate,
  });

  console.log(result);
}

//4. create enrollment
async function createEnrollment() {
  const studentId = await validationQuestion(
    rl,
    "Student Id: ",
    commonValidators.integerNumber("Student Id")
  );

  const subjectId = await validationQuestion(
    rl,
    "Subject Id: ",
    commonValidators.integerNumber("Subject Id")
  );

  const termId = await validationQuestion(
    rl,
    "Term Id: ",
    commonValidators.integerNumber("Term Id")
  );

  const overdue = await validationQuestion(
    rl,
    "overdue y/n: ",
    commonValidators.booleanValidator("overdue")
  );

  const result = createStd.services.enrollments.createEnrollment({
    studentId,
    subjectId,
    termId,
    overdue,
  });

  console.log(result);
}

//5. Update enrollment
async function updateEnrollment() {
  const action = await validationQuestion(
    rl,
    "Choose d (drop), w (withdraw), or c (complete),: ",
    commonValidators.statusValidator(["d", "w", "c"])
  );

  const enrollmentId = await validationQuestion(
    rl,
    "Enrollment ID: ",
    commonValidators.integerNumber("Enrollment ID")
  );

  let markIncomplete = false;
  let override = false;

  if (action === "c") {
    const incomplete = await validationQuestion(
      rl,
      "Mark incomplete (y/n)? ",
      commonValidators.booleanValidator("Mark incomplete")
    );
    markIncomplete = incomplete.toLowerCase() === "y";

    const overrideAudit = await validationQuestion(
      rl,
      "Override weight audit (y/n)? ",
      commonValidators.booleanValidator("Override weight audit")
    );
    override = overrideAudit.toLowerCase() === "y";
  }

  const updatedEnrollment = createStd.services.enrollments.updateEnrollment({
    enrollmentId,
    action,
    markIncomplete,
    override,
  });

  console.log(updatedEnrollment);
}

//6. Create / Update / Delete Assessment
async function assessments() {
  const chooseOperation = await validationQuestion(
    rl,
    "c (Create) / u (Update) / x (Delete) Assessment: ",
    commonValidators.statusValidator(["c", "u", "x"])
  );

  switch (chooseOperation) {
    case "c":
      const subjectId = await validationQuestion(
        rl,
        "Provide subjectId: ",
        commonValidators.integerNumber("Provide subjectId")
      );

      const termId = await validationQuestion(
        rl,
        "Provide termId: ",
        commonValidators.integerNumber("Provide termId")
      );

      const name = await validationQuestion(
        rl,
        "Provide name: ",
        commonValidators.nonEmptyString("Provide name")
      );

      const type = await validationQuestion(
        rl,
        "Choose quiz, exam or project: ",
        commonValidators.statusValidator(["quiz", "exam", "project"])
      );

      const maxPoints = await validationQuestion(
        rl,
        "Enter max Point: ",
        assessmentValidation.pointValidation()
      );

      const weightPercent = await validationQuestion(
        rl,
        "Enter weight Percent: ",
        assessmentValidation.weightPercentValidator()
      );

      const dueDate = await validationQuestion(
        rl,
        "Enter due date (optional): ",
        commonValidators.date("Enter due date (optional):") //TODO make it optional
      );

      const locked = await validationQuestion(
        rl,
        "is locked (y/n?: ",
        commonValidators.booleanValidator()
      );

      const updatedAssessments =
        createStd.services.assessments.createAssessment({
          subjectId,
          termId,
          name,
          type,
          maxPoints,
          weightPercent,
          dueDate,
          locked,
        });
      console.log(updatedAssessments);
      break;
    case "u":
      const assessmentId = await validationQuestion(
        rl,
        "Provide assessmentId: ",
        commonValidators.integerNumber("Provide subjectId")
      );

      const fieldToUpdate = await validationQuestion(
        rl,
        "Which field do you want to update? (subjectId, name, termId, type, maxPoints, weightPercent, dueDate, locked): ",
        commonValidators.statusValidator([
          "subjectId",
          "name",
          "termId",
          "type",
          "maxPoints",
          "weightPercent",
          "dueDate",
          "locked",
        ])
      );

      const newValue = await validationQuestion(
        rl,
        `Provide new value for ${fieldToUpdate}: `,
        assessmentValidation.fieldValidator(fieldToUpdate)
      );

      const updateAssessment = createStd.services.assessments.updateAssessment({
        id: assessmentId,
        [fieldToUpdate]: newValue,
      });

      console.log(updateAssessment);
      break;
    case "x":
      const id = await validationQuestion(
        rl,
        "Provide assessmentId: ",
        commonValidators.integerNumber("Provide subjectId")
      );

      const deleteAssessment =
        createStd.services.assessments.deleteAssessment(id);

      console.log(deleteAssessment);
      break;
  }
}

//7. record score
async function recordScore() {
  const assessmentId = await validationQuestion(
    rl,
    "Assessment Id: ",
    commonValidators.integerNumber("assessment Id")
  );

  const studentId = await validationQuestion(
    rl,
    "Student Id: ",
    commonValidators.integerNumber("Student Id")
  );

  const points = await validationQuestion(
    rl,
    "points: ",
    commonValidators.integerNumber("points")
  );

  const result = createStd.services.scores.addScore({
    assessmentId,
    studentId,
    points,
  });

  console.log(result);
}

//8. record score
async function recordAttendance() {
  const studentId = await validationQuestion(
    rl,
    "Student Id: ",
    commonValidators.integerNumber("Student Id")
  );

  const subjectId = await validationQuestion(
    rl,
    "Subject Id: ",
    commonValidators.integerNumber("subject Id")
  );

  const termId = await validationQuestion(
    rl,
    "Term Id: ",
    commonValidators.integerNumber("Term Id")
  );

  const date = await validationQuestion(
    rl,
    "Enter Date: ",
    commonValidators.date("Enter Date")
  );

  const status = await validationQuestion(
    rl,
    "Enter status: ",
    commonValidators.statusValidator(["P", "A", "L"])
  );

  const result = createStd.services.attendances.createAttendence({
    studentId,
    subjectId,
    termId,
    date,
    status,
  });

  console.log(result);
}

//9. transcript by student
async function transcriptByStudent() {
  const studentId = await validationQuestion(
    rl,
    "Student Id: ",
    commonValidators.integerNumber("Student Id")
  );

  const result = createStd.services.transcripts.getTranscript(studentId);

  console.log(result);
}

//10. term ranking
async function termRanking() {
  const termId = await validationQuestion(
    rl,
    "term Id: ",
    commonValidators.integerNumber("term Id")
  );

  const result = createStd.services.transcripts.termRanking(termId);

  console.log(result);
}

//11. leaderboard
async function leaderBoard() {
  const subjectId = await validationQuestion(
    rl,
    "subject Id: ",
    commonValidators.integerNumber("subject Id")
  );

  const termId = await validationQuestion(
    rl,
    "term Id: ",
    commonValidators.integerNumber("term Id")
  );

  const result = createStd.services.transcripts.leaderBoard(subjectId, termId);

  console.log(result);
}

//12. grade gistribution
async function gradeDistribution() {
  const subjectId = await validationQuestion(
    rl,
    "subject Id: ",
    commonValidators.integerNumber("subject Id")
  );

  const termId = await validationQuestion(
    rl,
    "term Id: ",
    commonValidators.integerNumber("term Id")
  );

  const buckets = await validationQuestion(
    rl,
    "grade buckets(please enter (A,B+,B...) or (80-89,90-100...) formats: ",
    commonValidators.arrayValidator("grade buckets")
  );

  const result = createStd.services.transcripts.gradeDistribution(
    subjectId,
    termId,
    buckets
  );

  console.log(result);
}

//13. Attendance Summary
async function attendanceSummary() {
  const termId = await validationQuestion(
    rl,
    "term Id: ",
    commonValidators.integerNumber("term Id")
  );

  const subjectId = await validationQuestion(
    rl,
    "subject Id: ",
    commonValidators.integerNumber("subject Id")
  );

  const result = createStd.services.attendances.getAttendanceSummary(
    subjectId,
    termId || null
  );

  console.log(result);
}

//14. Policies / Curve / Retake
async function updatePolicy() {
  const chooseOperation = await validationQuestion(
    rl,
    "(p)olicies / (c)urve / (r)etake: ",
    commonValidators.statusValidator(["p", "c", "r"])
  );

  switch (chooseOperation) {
    case "p":
      console.log("1) weightTolerance");
      console.log("2) lateCutoff");
      console.log("3) incompleteDays");
      console.log("4) attendanceThreshold (0-1)");
      console.log("5) minPassLetter");

      const choice = await validationQuestion(
        rl,
        "> ",
        commonValidators.nonEmptyValue()
      );
      switch (choice) {
        case "1":
          const weightTolerance = await validationQuestion(
            rl,
            "tolerance (weight audit slack): ",
            commonValidators.decimalNumbers("tolerance")
          );

          createStd.services.policy.updatePolicy({
            weightTolerance: Number(weightTolerance),
          });

          console.log(`tolerance updated as ${weightTolerance}`);
          break;
        case "2":
          const lateCutoff = await validationQuestion(
            rl,
            "lateCutoff (days): ",
            commonValidators.integerNumber("lateCutoff")
          );

          createStd.services.policy.updatePolicy({
            lateEnrollmentCutoff: Number(lateCutoff),
          });

          console.log(`lateCutoff updated as ${lateCutoff}`);
          break;
        case "3":
          const incompleteDays = await validationQuestion(
            rl,
            "incompleteDays: ",
            commonValidators.integerNumber("incompleteDays")
          );

          createStd.services.policy.updatePolicy({
            incompleteHandling: { expiresAfterDays: Number(incompleteDays) },
          });

          console.log(`incompleteDays updated as ${incompleteDays}`);
          break;
        case "4":
          const threshold = await validationQuestion(
            rl,
            "attendanceThreshold: ",
            commonValidators.decimalNumbers("attendanceThreshold")
          );
          createStd.services.policy.updatePolicy({
            attendanceThreshold: Number(threshold),
          });
          console.log(`attendanceThreshold updated as ${attendanceThreshold}`);
          break;

        case "5":
          const minLetter = await validationQuestion(
            rl,
            "minPassLetter (for pass/fail subjects): ",
            commonValidators.nonEmptyString("minPassLetter")
          );
          createStd.services.policy.updatePolicy({
            minimumPassingLetter: minLetter,
          });

          console.log(`minPassLetter (for pass/fail subjects) as ${minLetter}`);
          break;
        case "0":
          break;
      }

      break;
    case "c":
      console.log("1) None");
      console.log("2) Linear (add percent + max cap)");
      console.log("3) Percentile");
      console.log("0) back");

      const curveChoice = await validationQuestion(
        rl,
        "Choose curve type: ",
        commonValidators.statusValidator(["1", "2", "3", "0"])
      );

      switch (curveChoice) {
        case "1":
          const curved = {
            type: "none",
            addPercent: null,
            maxCap: null,
            distribution: null,
          };
          createStd.services.policy.updatePolicy({
            curve: curved,
          });
          console.log(`curve updated as ${curved}`);
          break;

        case "2":
          const addPercent = await validationQuestion(
            rl,
            "addPercent: ",
            commonValidators.number("addPercent")
          );

          const maxCap = await validationQuestion(
            rl,
            "maxCap in range 0-100: ",
            commonValidators.validateMaxCap("maxCap")
          );

          createStd.services.policy.updatePolicy({
            curve: {
              type: "linear",
              addPercent: Number(addPercent),
              maxCap: Number(maxCap),
              distribution: null,
            },
          });

          console.log(
            `added linear curve: percent - ${addPercent}%, cap - ${maxCap}%)`
          );
          break;

        case "3":
          const medianTarget = await validationQuestion(
            rl,
            "Target median percent: ",
            commonValidators.number("medianTarget")
          );

          const percentileCap = await validationQuestion(
            rl,
            "Percentile cap: ",
            commonValidators.number("percentileCap")
          );

          createStd.services.policy.updatePolicy({
            curve: {
              type: "percentile",
              addPercent: null,
              maxCap: Number(percentileCap),
              distribution: { medianTarget: Number(medianTarget) },
            },
          });
          console.log(`curve set to percentile - ${medianTarget}`);
          break;

        case "0":
          break;
      }
      break;
    case "r":
      const retake = await validationQuestion(
        rl,
        "Retake policy (latest/best/average): ",
        commonValidators.statusValidator(["latest", "best", "average"])
      );

      const updated = createStd.services.policy.updatePolicy({
        retakePolicy: retake,
      });

      console.log(updated);
      break;
  }
}

studentMenu();
