import type card = require("./card");
import type list = require("./list");

export interface IBoard {
    id: string;
    title: string;
    lists: list.IList[];
    cards: card.ICard[];
}