import readline from "readline";
import { App } from "./core/app";
import { Validators } from "./utils/questionValidators";
import { validationQuestion } from "./utils/validationQuestion";
import { Card, ICard } from "./models/card";

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
      await manageCardsMenu(boardId);
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
    console.log();
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

  // return manageListsMenu(boardId);
}

async function addListToBoard(boardId: string) {
  const name = await validationQuestion(
    rl,
    "List name: ",
    Validators.isValidBoardName
  );

  app.services.lists.addList(boardId, name);
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

  app.services.lists.renameList(
    boardId,
    { name: newName },
    Number(chooseIndex) - 1
  );
}

async function deleteList(boardId: string) {
  app.services.lists.getAllListName(boardId);

  const chooseIndex = await validationQuestion(
    rl,
    "Choose list item(numeric): ",
    Validators.isValidNumber
  );

  const validate: string = await validationQuestion(
    rl,
    "Confirm Detetion y/n: ",
    (input) => Validators.isValidChoice(input, ["y", "n"])
  );

  app.services.lists.deleteList(boardId, Number(chooseIndex) - 1, validate);
}

async function manageCardsMenu(boardId: string) {
  console.log("\n--- CARDS MENU ---");
  console.log("1) Add Card");
  console.log("2) View Card");
  console.log("3) Edit Card");
  console.log("4) Delete Card");
  console.log("5) Move Card");
  console.log("6) Reorder Card");
  console.log("7) Back");

  const choice = await ask("> ");

  switch (choice.trim()) {
    case "1":
      await addCard(boardId);
      break;
    case "2":
      await viewCard(boardId);
      break;
    case "3":
      await editCard(boardId);
      break;
    case "4":
      await deleteCard(boardId);
      break;
    case "5":
      await moveCard(boardId);
      break;
    case "6":
      await reorderCard(boardId);
      break;
    case "7":
      return boardMenu(boardId);
    default:
      console.log("Invalid choice");
  }
}

async function addCard(boardId: string) {
  app.services.lists.getAllListName(boardId);

  const listIndex = await validationQuestion(
    rl,
    "Choose list item(numeric): ",
    Validators.isValidNumber
  );

  const title = await validationQuestion(
    rl,
    "Card title: ",
    Validators.isValidBoardName
  );

  const description = await validationQuestion(
    rl,
    "Card description: ",
    Validators.isValidBoardName
  );

  const labels = await validationQuestion(
    rl,
    "Card label (comma seperated): ",
    Validators.isValidBoardName
  );

  const dueDate = await validationQuestion(
    rl,
    "Card due date: ",
    Validators.isValidDate
  );

  const labelsArr = labels
    .split(",")
    .map((label) => label.trim())
    .filter((label) => label !== "");

  app.services.cards.createCard(
    boardId,
    Number(listIndex) - 1,
    title,
    description,
    labelsArr,
    dueDate || null
  );

  return manageCardsMenu(boardId);
}

async function viewCard(boardId: string) {
  app.services.cards.getAllCardName(boardId);

  const cardIndex = await validationQuestion(
    rl,
    "Choose card (numeric): ",
    Validators.isValidNumber
  );

  const cardDetails = app.services.cards.getCardNameByIndex(
    boardId,
    Number(cardIndex) - 1
  );

  console.log(cardDetails);

  return manageCardsMenu(boardId);
}

async function editCard(boardId: string) {
  app.services.cards.getAllCardName(boardId);

  const cardIndex = Number(
    await validationQuestion(
      rl,
      "Choose card (numeric): ",
      Validators.isValidNumber
    )
  );

  console.log("\n--- choose field to change ---");
  console.log("1) Title");
  console.log("2) Description");
  console.log("3) Labels");
  console.log("4) Due Date");

  const choice = (await ask("> ")).trim();

  let update: Partial<ICard> = {};

  switch (choice) {
    case "1": {
      const newTitle = await ask("New title: ");
      update = { title: newTitle };
      break;
    }
    case "2": {
      const newDesc = await ask("New description: ");
      update = { description: newDesc };
      break;
    }
    case "3": {
      const labelsStr = await ask("Labels (comma-separated): ");
      const newLabels = labelsStr
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      update = { labels: newLabels };
      break;
    }
    case "4": {
      const newDue = await ask("New due date (YYYY-MM-DD): ");
      update = { dueDate: newDue };
      break;
    }
    default:
      console.log("Invalid choice");
      return manageCardsMenu(boardId);
  }

  app.services.cards.updateCard(boardId, Number(cardIndex) - 1, update);

  console.log("Card updated!");
  return manageCardsMenu(boardId);
}

async function deleteCard(boardId: string) {
  app.services.cards.getAllCardName(boardId);

  const cardIndex = await validationQuestion(
    rl,
    "Choose card (numeric): ",
    Validators.isValidNumber
  );

  const validate: string = await validationQuestion(
    rl,
    "Confirm Detetion y/n: ",
    (input) => Validators.isValidChoice(input, ["y", "n"])
  );

  app.services.cards.deleteCard(boardId, Number(cardIndex) - 1, validate);

  console.log("Crad Deleted");
  return manageCardsMenu(boardId);
}

async function moveCard(boardId: string) {
  app.services.cards.getAllCardName(boardId);

  const cardIndex = await validationQuestion(
    rl,
    "Choose card (numeric): ",
    Validators.isValidNumber
  );

  app.services.lists.getAllListName(boardId);

  const targetListIndex = await validationQuestion(
    rl,
    "Choose card (numeric): ",
    Validators.isValidNumber
  );

  app.services.cards.moveCard(
    boardId,
    Number(cardIndex) - 1,
    Number(targetListIndex) - 1
  );

  console.log("Crad moved");
  return manageCardsMenu(boardId);
}

async function reorderCard(boardId: string) {
  console.log("\n--- REORDER CARD ---");

  app.services.lists.getAllListName(boardId);

  const listIndex =
    Number(
      await validationQuestion(
        rl,
        "Choose list (numeric): ",
        Validators.isValidNumber
      )
    ) - 1;

  const board = app.controllers.boards.getItemById(boardId);
  if (!board) {
    console.log("NOT_FOUND: board not found");
    return manageCardsMenu(boardId);
  }

  const list = board.lists[listIndex];
  if (!list) {
    console.log("NOT_FOUND: list not found");
    return manageCardsMenu(boardId);
  }

  console.log("\nCurrent card order:");
  list.cardOrder.forEach((cardId: string, i: number) => {
    const card = board.cards.find((card: Card) => card.id === cardId);
    console.log(`${i + 1}) ${card?.title ?? "[missing]"}`);
  });

  const cardIndex =
    Number(
      await validationQuestion(
        rl,
        "Select card (numeric): ",
        Validators.isValidNumber
      )
    ) - 1;

  const newIndex =
    Number(
      await validationQuestion(
        rl,
        "Move to position (numeric): ",
        Validators.isValidNumber
      )
    ) - 1;

  app.services.cards.reorderCards(boardId, listIndex, cardIndex, newIndex);

  console.log("Card reordered");

  return manageCardsMenu(boardId);
}

mainMenu();
