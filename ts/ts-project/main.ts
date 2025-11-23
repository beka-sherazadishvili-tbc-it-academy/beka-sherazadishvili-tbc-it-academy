import readline from "readline";
import { App } from "./core/app";
import { Validators } from "./utils/questionValidators";
import { validationQuestion } from "./utils/validationQuestion";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = new App();

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function mainMenu() {
  console.log("\n=== MINI TRELLO - MAIN MENU ===");
  console.log("1) Select Board");
  console.log("2) Create Board");
  console.log("3) Delete Board");
  console.log("0) Exit");

  const choice = await ask("> ");

  switch (choice.trim()) {
    case "2":
      await createBoard();
      break
    case "3":
      await deleteBoard();
      break;
    case "0":
      rl.close();
      return;
    default:
      console.log("Invalid choice. Please try again.");
      return mainMenu();
  }
}

async function createBoard(): Promise<void> {
  const name = await validationQuestion(
    rl,
    "Board name: ",
    Validators.isValidBoardName
  );

  app.services.boards.createBoard(name);
  return mainMenu();
}

async function deleteBoard(): Promise<void> {
  const boardId = await validationQuestion(
    rl,
    "Board id: ",
    Validators.isValidBoardName
  );

  app.services.boards.deleteBoard(boardId);
  return mainMenu();
}

mainMenu();
