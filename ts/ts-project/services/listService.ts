import { randomUUID } from "crypto";
import { BoardController } from "../data-controller/boardController";
import { CardController } from "../data-controller/cardController";
import { ListController } from "../data-controller/listController";
import { List } from "../models/list";
import { Board } from "../models/board";

export class ListService {
  constructor(
    private cardController: CardController,
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
    this.getBoardById(boardId);

    const newList = new List(randomUUID(), name, []);

    this.listController.add(boardId, newList);
  }

  public renameList(boardId: string, newName: string, index: number): void {
    const board = this.getBoardById(boardId);

    const listItem = board.lists[index];

    if(!listItem) {
        throw new Error('NOT_FOUND: no such item in the list')
    }

    const newList: List = new List(
        listItem.id,
        newName,
        listItem.cardOrder
    )

    this.listController.update(boardId, newList);
  }

  public deleteList(boardId: string, newName: string, index: number): void {
    const board = this.getBoardById(boardId);

    const listItem = board.lists[index];

    if(!listItem) {
        throw new Error('NOT_FOUND: no such item in the list')
    }

    const newList: List = new List(
        listItem.id,
        newName,
        listItem.cardOrder
    )

    this.listController.update(boardId, newList);
  }
}
