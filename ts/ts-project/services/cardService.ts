import { CardController } from "../data-controller/cardController";
import { randomUUID } from "crypto";
import { BoardController } from "../data-controller/boardController";
import { ListController } from "../data-controller/listController";
import { Card } from "../models/card";

export class CardService {
  constructor(
    private cardController: CardController,
    private boardController: BoardController,
    private listController: ListController
  ) {}

  createCard(
    boardId: string,
    listId: string,
    title: string,
    description: string = "",
    labels: string[] = [],
    dueDate: string | null = null
  ): Card {
    const existingBoard = this.boardController.getItemById(boardId);
    if (!existingBoard) {
      throw new Error("NOT_FOUND: board not found");
    }

    const existingList = this.listController.getItemById(boardId, listId);
    if (!existingList) {
      throw new Error("NOT_FOUND: list not found");
    }

    const card = new Card(
      randomUUID(),
      title,
      description,
      labels,
      new Date().toISOString(),
      dueDate
    );

    this.cardController.add(boardId, listId, card);
    return card;
  }
}
