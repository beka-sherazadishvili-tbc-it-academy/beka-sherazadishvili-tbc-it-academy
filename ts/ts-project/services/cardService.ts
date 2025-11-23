import { CardController } from "../data-controller/cardController";
import { randomUUID } from "crypto";
import { BoardController } from "../data-controller/boardController";
import { ListController } from "../data-controller/listController";
import { Card, ICard } from "../models/card";

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

  public getAllCardName(boardId: string): void {
    try {
      const existingBoard = this.boardController.getItemById(boardId);
      if (!existingBoard) {
        throw new Error("NOT_FOUND: board not found");
      }

      console.log("--- Card List ---");
      existingBoard.cards.forEach((card, i) => {
        console.log(`${i + 1}) ${card.title}`);
      });
    } catch (err) {
      console.error((err as Error).message);
    }
  }

  public getCardNameByIndex(boardId: string, index: number): ICard | undefined {
    const existingBoard = this.boardController.getItemById(boardId);
    if (!existingBoard) {
      throw new Error("NOT_FOUND: board not found");
    }

    return existingBoard.cards[index]?.toJSON();
  }

  public updateCard(
    boardId: string,
    cardIndex: number,
    update: Partial<ICard>
  ): void {
    try {
      const existingBoard = this.boardController.getItemById(boardId);
      if (!existingBoard) {
        throw new Error("NOT_FOUND: board not found");
      }

      const cardItem = existingBoard.cards[cardIndex];
      if (!cardItem) {
        throw new Error("NOT_FOUND: card not found");
      }

      const updated: Card = Card.fromJSON({
        ...cardItem.toJSON(),
        ...update,
      });

      this.cardController.update(boardId, cardItem.id, updated);
    } catch (err) {
      console.error((err as Error).message);
    }
  }

  public deleteCard(boardId: string, cardIndex: number, validate: string) {
    try {
      if (!(validate.toLowerCase() === "y")) {
        throw new Error("POLICY: can not delete without confirmation");
      }
      
      const existingBoard = this.boardController.getItemById(boardId);
      if (!existingBoard) {
        throw new Error("NOT_FOUND: board not found");
      }

      const cardItem = existingBoard.cards[cardIndex];
      if (!cardItem) {
        throw new Error("NOT_FOUND: card not found");
      }

      this.cardController.delete(boardId, cardItem.id);
    } catch (err) {
      console.error((err as Error).message);
    }
  }
}
