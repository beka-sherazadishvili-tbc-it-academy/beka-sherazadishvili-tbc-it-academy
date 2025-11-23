import { Board } from "../models/board";
import { Card } from "../models/card";
import { AppStateController } from "./appStateController";

export class CardController {
  constructor(private state: AppStateController) {}

  private getBoard(boardId: string): Board {
    const board = this.state.getState().boards.find((b) => b.id === boardId);
    if (!board) {
      throw new Error("NOT_FOUND: board not found");
    }
    return board;
  }

  public getCardsInList(boardId: string, listId: string): Card[] {
    const board = this.getBoard(boardId);
    const list = board.lists.find((item) => item.id === listId);
    if (!list) {
      throw new Error("NOT_FOUND: list not found");
    }

    return list.cardOrder
      .map((cardId) => board.cards.find((card) => card.id === cardId))
      .filter((card): card is Card => card !== undefined);
  }

  public add(boardId: string, listId: string, card: Card): void {
    const board = this.getBoard(boardId);
    const list = board.lists.find((item) => item.id === listId);
    if (!list) {
      throw new Error("NOT_FOUND: list not found");
    }

    console.log(card)
    console.log(card.id)

    board.cards.push(card);
    list.cardOrder.push(card.id);
    this.state.save();
  }

  public delete(boardId: string, cardId: string): void {
    const board = this.getBoard(boardId);

    const cardIndex = board.cards.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) {
      throw new Error("NOT_FOUND: card not found");
    }
    board.cards.splice(cardIndex, 1);

    board.lists.forEach((list) => {
      const idx = list.cardOrder.indexOf(cardId);
      if (idx !== -1) {
        list.cardOrder.splice(idx, 1);
      }
    });

    this.state.save();
  }
}
