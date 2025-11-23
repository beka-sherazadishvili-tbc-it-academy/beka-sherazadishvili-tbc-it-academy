import { randomUUID } from "crypto";
import { BoardController } from "../data-controller/boardController";
import { CardController } from "../data-controller/cardController";
import { ListController } from "../data-controller/listController";
import { List } from "../models/list";
import { Board } from "../models/board";

export class ListService {
  constructor(
    private boardController: BoardController,
    private listController: ListController
  ) {}

  private getBoardById(boardId: string): Board {
    const board = this.boardController
      .getAll()
      .find((board) => board.id === boardId);

    if (!board) {
      throw new Error("NOT_FOUND: board does not exists");
    }

    return board;
  }

  public getAllListName(boardId: string) {
    const board = this.getBoardById(boardId);

    for (let i = 0; i < board.lists.length; i++) {
      console.log(`${i + 1}) ${board.lists[i]?.name}`);
    }
  }

  public addList(boardId: string, name: string): void {
    try {
      this.getBoardById(boardId);

      const newList = new List(randomUUID(), name, []);

      this.listController.add(boardId, newList);
    } catch (err) {
      console.error((err as Error).message);
    }
  }

  public renameList(boardId: string, newName: string, index: number): void {
    try {
      const board = this.getBoardById(boardId);

      const listItem = board.lists[index];

      if (!listItem) {
        throw new Error("NOT_FOUND: no such item in the list");
      }

      const newList: List = new List(listItem.id, newName, listItem.cardOrder);

      this.listController.update(boardId, newList);
    } catch (err) {
      console.error((err as Error).message);
    }
  }

  public deleteList(boardId: string, index: number): void {
    try {
      const board = this.getBoardById(boardId);

      const listItem = board.lists[index];

      if (!listItem) {
        throw new Error("NOT_FOUND: no such item in the list");
      }

      this.listController.delete(boardId, listItem.id);
    } catch (err) {
      console.error((err as Error).message);
    }
  }
}
