import { CardController } from "../data-controller/cardController";
import { randomUUID } from "crypto";
import { BoardController } from "../data-controller/boardController";
import { ListController } from "../data-controller/listController";
import { Board, IBoard } from "../models/board";

export class BoardService {
  constructor(
    private cardController: CardController,
    private boardController: BoardController,
    private listController: ListController
  ) {}

  createBoard(name: string): IBoard {
    const board: Board = new Board(randomUUID(), name, [], []);

    this.boardController.add(board);
    return board.toJSON();
  }

  public deleteBoard(boardId: string, validate: string): void {
    try {
      if (!(validate.toLowerCase() === "y")) {
        throw new Error("POLICY: can not delete without confirmation");
      }
      const boardExists = this.boardController.getItemById(boardId);

      if (!boardExists) {
        throw new Error("NOT_FOUND: no such board to delete");
      }

      this.boardController.delete(boardId);
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  public getAllBoard(): void {
    const boards = this.boardController.getAll();

    if (boards.length === 0) {
      throw new Error("NOT_FOUND: board does not exist, please add at first");
    }

    for (let i = 0; i < boards.length; i++) {
      console.log(`${i + 1}) ${boards[i]?.name}`);
    }
  }

  public getBoardIdByIndex(index: number): string {
    const board = this.boardController.getAll()[index];

    if (!board) {
      throw new Error("NOT_FOUND: board does not exist");
    }

    return board.id;
  }
}
