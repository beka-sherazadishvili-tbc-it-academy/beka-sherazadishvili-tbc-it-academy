import { CardController } from "../data-controller/cardController";
import { randomUUID } from "crypto";
import { BoardController } from "../data-controller/boardController";
import { ListController } from "../data-controller/listController";
import { Card, ICard } from "../models/card";
import { List } from "../models/list";
import { Board } from "../models/board";

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
    try {
      const existingBoard = this.boardController.getItemById(boardId);
      if (!existingBoard) {
        throw new Error("NOT_FOUND: board not found");
      }

      return existingBoard.cards[index]?.toJSON();
    } catch (err) {
      console.error((err as Error).message);
    }
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

  public deleteCard(boardId: string, cardIndex: number, validate: string): void {
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

  public moveCard(boardId: string, cardIndex: number, targetIndex: number): void {
    try {
      const existingBoard = this.boardController.getItemById(boardId);
      if (!existingBoard) {
        throw new Error("NOT_FOUND: board not found");
      }

      const targetItem = existingBoard.lists[targetIndex];
      if (!targetItem) {
        throw new Error("NOT_FOUND: card not found");
      }

      const cardItem = existingBoard.cards[cardIndex];
      if (!cardItem) {
        throw new Error("NOT_FOUND: card not found");
      }

      this.cardController.deleteFromList(boardId, cardItem.id);
      this.cardController.addExistingCardToList(
        boardId,
        targetItem.id,
        cardItem.id
      );
    } catch (err) {
      console.error((err as Error).message);
    }
  }

  public reorderCards(
    boardId: string,
    listIndex: number,
    cardIndex: number,
    newIndex: number
  ): void {
    try {
      const existingBoard = this.boardController.getItemById(boardId);
      if (!existingBoard) {
        throw new Error("NOT_FOUND: board not found");
      }

      const listItem = existingBoard.lists[listIndex];
      if (!listItem) {
        throw new Error("NOT_FOUND: list not found");
      }

      const cardOrder = listItem.cardOrder;

      if (cardIndex < 0 || cardIndex >= cardOrder.length) {
        throw new Error("VALIDATION_ERROR: card index out of range");
      }

      if (newIndex < 0 || newIndex >= cardOrder.length) {
        throw new Error("VALIDATION_ERROR: new index out of range");
      }

      const [cardId] = cardOrder.splice(cardIndex, 1);

      if (!cardId) {
        throw new Error("NOT_FOUND: no cuch id");
      }

      cardOrder.splice(newIndex, 0, cardId);

      this.listController.update(boardId, List.fromJSON(listItem));
    } catch (err) {
      console.error((err as Error).message);
    }
  }

  public searchByText(boardId: string, search: string): void {
    try {
      const existingBoard = this.boardController.getItemById(boardId);
      if (!existingBoard) {
        throw new Error("NOT_FOUND: board not found");
      }

      const results: { card: Card; listName: string; boardName: string }[] = [];

      for (const list of existingBoard.lists) {
        for (const cardId of list.cardOrder) {
          const card = existingBoard.cards.find((card) => card.id === cardId);
          if (!card) continue;

          const match =
            card.title.toLowerCase().includes(search) ||
            card.description.toLowerCase().includes(search);

          if (match) {
            results.push({
              card,
              listName: list.name,
              boardName: existingBoard.name,
            });
          }
        }
      }

      console.log("\n--- RESULTS ---");
      if (results.length === 0) {
        console.log("No cards found.");
      } else {
        results.forEach((item, i) =>
          console.log(
            `${i + 1}) ${item.card.title} (List: ${item.listName}, Board: ${
              item.boardName
            })`
          )
        );
      }
    } catch (err) {
      console.error((err as Error).message);
    }
  }

  public searchByLabel(boardId: string, search: string): void {
    try {
      const existingBoard = this.boardController.getItemById(boardId);
      if (!existingBoard) {
        console.log("NOT_FOUND: board not found");
        return;
      }

      const results: { card: Card; listName: string }[] = [];

      for (const list of existingBoard.lists) {
        for (const cardId of list.cardOrder) {
          const card = existingBoard.cards.find((card) => card.id === cardId);
          if (!card) continue;

          const match = card.labels.some(
            (label: string) => label.toLowerCase() === search
          );

          if (match) {
            results.push({ card, listName: list.name });
          }
        }
      }

      console.log("\n--- RESULTS ---");
      if (results.length === 0) {
        console.log("No cards found.");
      } else {
        results.forEach((item, i) => {
          console.log(`${i + 1}) ${item.card.title}  (List: ${item.listName})`);
        });
      }
    } catch (err) {
      console.error((err as Error).message);
    }
  }
}
