import type board = require("./board");

export interface AppStateModel {
    boards: board.IBoard[];
}