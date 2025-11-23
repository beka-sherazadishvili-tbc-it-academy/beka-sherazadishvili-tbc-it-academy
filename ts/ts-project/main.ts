import readline from "readline";
import { App } from "./core/app";
import { Validators } from "./utils/questionValidators";
import { validationQuestion } from "./utils/validationQuestion";
import { Card } from "./models/card";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = new App();

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function mainMenu() {
  console.log("\n---MINI TRELLO---");
  console.log("1) Select Board");
  console.log("2) Create Board");
  console.log("3) Delete Board");
  console.log("0) Exit");

  const choice = await ask("> ");

  switch (choice.trim()) {
    case "1":
      await selectBoard();
      break;
    case "2":
      await createBoard();
      break;
    case "3":
      await deleteBoard();
      break;
    case "0":
      rl.close();
      return;
    default:
      console.log("Invalid board choice. Please try again.");
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
  const boardId: string = await validationQuestion(
    rl,
    "Board id: ",
    Validators.isValidBoardName
  );

  const validate: string = await validationQuestion(
    rl,
    "Confirm Detetion y/n: ",
    (input) => Validators.isValidChoice(input, ["y", "n"])
  );

  app.services.boards.deleteBoard(boardId, validate);
  return mainMenu();
}

async function selectBoard(): Promise<void> {
  app.services.boards.getAllBoard();

  const boardIndex: string = await validationQuestion(
    rl,
    "Choose bord id: ",
    Validators.isValidNumber
  );

  const boardId = app.services.boards.getBoardIdByIndex(Number(boardIndex) - 1);

  await boardMenu(boardId);
  return mainMenu();
}

async function boardMenu(boardId: string) {
  console.log("---BOARD MENU FLOW---");
  console.log("1) Show Board Details");
  console.log("2) Manage Lists");
  console.log("3) Manage Cards");
  console.log("4) Search");
  console.log("5) Back");

  const choice: string = await validationQuestion(
    rl,
    "Choose Action: ",
    Validators.isValidNumber
  );

  switch (choice) {
    case "1":
      await showBoardDetails(boardId);
      await ask("\nPress Enter to continue...");
      return boardMenu(boardId);
    case "2":
      await manageListsMenu(boardId);
      break;
    case "3":
      await deleteBoard();
      break;
    case "4":
      await deleteBoard();
      break;
    case "5":
      return;
    default:
      console.log("Invalid list choice. Please try again.");
      return mainMenu();
  }
}

async function showBoardDetails(boardId: string) {
  const board = app.controllers.boards.getItemById(boardId);

  if (!board) {
    console.log("Board not found.");
    return;
  }

  for (const list of board.lists) {
    console.log(`List: ${list.name} (${list.id})`);

    for (const cardId of list.cardOrder) {
      const card = board.cards.find((c: Card) => c.id === cardId);

      if (!card) {
        console.log(`NOT_FOUND: card with id - ${cardId} not found`);
        continue;
      }

      console.log(`${card.title}`);
    }
    console.log()
  }
}

async function manageListsMenu(boardId: string) {
  console.log("\n--- LISTS MENU ---");
  console.log("1) Add List");
  console.log("2) Rename List");
  console.log("3) Delete List");
  console.log("4) Back");

  const choice = await ask("> ");

  switch (choice.trim()) {
    case "1":
      await addListToBoard(boardId);
      break;

    case "2":
      await renameList(boardId);
      break;

    case "3":
      await deleteList(boardId);
      break;

    case "4":
      return boardMenu(boardId);

    default:
      console.log("Invalid choice");
  }

  return manageListsMenu(boardId);
}

async function addListToBoard(boardId: string) {
  const name = await validationQuestion(
    rl,
    "List name: ",
    Validators.isValidBoardName
  );

  app.services.lists.addList(boardId ,name);
  return manageListsMenu(boardId);
}

async function renameList(boardId: string) {
  app.services.lists.getAllListName(boardId);

  const chooseIndex = await validationQuestion(
    rl,
    "Choose list item(numeric): ",
    Validators.isValidNumber
  );

  const newName = await validationQuestion(
    rl,
    "New name: ",
    Validators.isValidBoardName
  );

  app.services.lists.renameList(boardId, newName, Number(chooseIndex) - 1);
}

async function deleteList(boardId: string) {
  app.services.lists.getAllListName(boardId);

  const chooseIndex = await validationQuestion(
    rl,
    "Choose list item(numeric): ",
    Validators.isValidNumber
  );

  app.services.lists.deleteList(boardId, Number(chooseIndex) - 1);
}

// async function manageCardsMenu(boardId: string) {
//   console.log("\n--- CARDS MENU ---");
//   console.log("1) Add Card");
//   console.log("2) View Card");
//   console.log("3) Edit Card");
//   console.log("4) Delete Card");
//   console.log("5) Move Card");
//   console.log("6) Reorder Card");
//   console.log("7) Back");

//   const choice = await ask("> ");

//   switch (choice.trim()) {
//     case "1":
//       await addCard(boardId);
//       break;
//     case "2":
//       await viewCard(boardId);
//       break;
//     case "3":
//       await editCard(boardId);
//       break;
//     case "4":
//       await deleteCard(boardId);
//       break;
//     case "5":
//       await moveCard(boardId);
//       break;
//     case "6":
//       await reorderCard(boardId);
//       break;
//     case "7":
//       return boardMenu(boardId);
//     default:
//       console.log("Invalid choice");
//   }

//   return manageCardsMenu(boardId);
// }

mainMenu();
