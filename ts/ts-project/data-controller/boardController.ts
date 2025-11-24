import { Board } from "../models/board";
import { AppStateController } from "./appStateController";

export class BoardController {
  constructor(private state: AppStateController) {}

  public getAll(): Board[] {
    return this.state.getState().boards;
  }

  public getItemById(id: string): Board | undefined {
    return this.state.getState().boards.find(board => board.id === id);
  }

  public add(board: Board): void {
    const boards = this.state.getState().boards;

    if (boards.find(item => item.id === board.id)) {
      throw new Error("CONFLICT: board id already exists");
    }

    boards.push(board);
    this.state.save();
  }

  public update(id: string, updated: Board): void {
    const boards = this.state.getState().boards;
    const index = boards.findIndex(board => board.id === id);

    if (index === -1) {
      throw new Error("NOT_FOUND: board not found");
    }

    boards[index] = updated;
    this.state.save();
  }

  public delete(id: string): void {
    const boards = this.state.getState().boards;
    const index = boards.findIndex(board => board.id === id);

    if (index === -1) {
      throw new Error("NOT_FOUND: board not found");
    }

    boards.splice(index, 1);
    this.state.save();
  }
}
