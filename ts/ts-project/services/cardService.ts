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

  public createCard(
    boardId: string,
    listId: number,
    title: string,
    description: string,
    labels: string[] = [],
    dueDate: string | null = null
  ): Card | undefined {
    try {
      const existingBoard = this.boardController.getItemById(boardId);
      if (!existingBoard) {
        throw new Error("NOT_FOUND: board not found");
      }

      const listItem = existingBoard.lists[listId];

      if (!listItem) {
        throw new Error("NOT_FOUND: no such item in the list");
      }

      const existingList = this.listController.getItemById(
        boardId,
        listItem.id
      );
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

      this.cardController.add(boardId, listItem.id, card);
      return card;
    } catch (err) {
      console.error((err as Error).message);
    }
  }

  public getAllCardName(boardId: string): void {}
}
