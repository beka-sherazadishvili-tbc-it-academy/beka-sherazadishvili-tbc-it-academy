import { CardController } from "../data-controller/cardController";
import { randomUUID } from "crypto";
import { BoardController } from "../data-controller/boardController";
import { ListController } from "../data-controller/listController";
import { Board, IBoard } from "../models/board";
import { AssertionError } from "assert";

export class BoardService {
  constructor(
    private cardController: CardController,
    private boardController: BoardController,
    private listController: ListController
  ) {}

  createBoard(name: string): IBoard {
    const board = new Board(randomUUID(), name, [], []);

    this.boardController.add(board);
    return board.toJSON();
  }

  deleteBoard(boardId: string) {
    try {
      const boardExists = this.boardController.getItemById(boardId);

      if (!boardExists) {
        throw new Error("NOT_FOUND: no such board to delete");
      }

      this.boardController.delete(boardId);
    } catch (error) {
      console.error((error as Error).message);
    }
  }
}
