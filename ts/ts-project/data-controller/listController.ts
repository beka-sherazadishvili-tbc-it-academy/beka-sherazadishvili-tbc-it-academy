import { Board } from "../models/board";
import { List } from "../models/list";
import { AppStateController } from "./appStateController";

export class ListController {
  constructor(private state: AppStateController) {}

  private getBoard(boardId: string): Board {
    const board = this.state.getState().boards.find(board => board.id === boardId);

    if (!board) {
      throw new Error("NOT_FOUND: board not found");
    }

    return board;
  }

  getAll(boardId: string): List[] {
    return this.getBoard(boardId).lists;
  }

  getItemById(boardId: string, listId: string): List | undefined {
    return this.getBoard(boardId).lists.find(l => l.id === listId);
  }

  add(boardId: string, list: List): void {
    const board = this.getBoard(boardId);

    if (board.lists.find(item => item.id === list.id)) {
      throw new Error("CONFLICT: list id already exists");
    }

    board.lists.push(list);
    this.state.save();
  }

  update(boardId: string, listId: string, updated: List): void {
    const board = this.getBoard(boardId);
    const index = board.lists.findIndex(item => item.id === listId);

    if (index === -1) {
      throw new Error("NOT_FOUND: list not found");
    }

    board.lists[index] = updated;
    this.state.save();
  }

  delete(boardId: string, listId: string): void {
    const board = this.getBoard(boardId);
    const index = board.lists.findIndex(item => item.id === listId);

    if (index === -1) {
      throw new Error("NOT_FOUND: list not found");
    }

    board.lists.splice(index, 1);
    this.state.save();
  }
}