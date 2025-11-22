import type { IBoard } from "./board";
import { Board } from "./board";

export class AppState {
  private _boards: Board[];

  constructor(boards: Board[] = []) {
    this._boards = boards;
  }

  get boards(): Board[] {
    return this._boards;
  }

  static fromJSON(obj: { boards: IBoard[] }) {
    return new AppState(obj.boards.map(Board.fromJSON));
  }

  toJSON() {
    return {
      boards: this._boards.map(b => b.toJSON()),
    };
  }
}
