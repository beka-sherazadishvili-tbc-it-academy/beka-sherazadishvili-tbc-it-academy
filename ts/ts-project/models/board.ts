import { Card, ICard } from "./card";
import { IList, List } from "./list";

export interface IBoard {
  id: string;
  name: string;
  lists: IList[];
  cards: ICard[];
}

export class Board implements IBoard {
  private _id: string;
  private _name: string;
  private _lists: List[];
  private _cards: Card[];

  constructor(
    id: string,
    name: string,
    lists: List[] = [],
    cards: Card[] = []
  ) {
    this._id = id;
    this._name = name;
    this._lists = lists;
    this._cards = cards;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get lists(): List[] {
    return this._lists;
  }

  get cards(): Card[] {
    return this._cards;
  }

  static fromJSON(obj: IBoard) {
    return new Board(
      obj.id,
      obj.name,
      obj.lists.map(List.fromJSON),
      obj.cards.map(Card.fromJSON)
    );
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      lists: this._lists.map(l => l.toJSON()),
      cards: this._cards.map(c => c.toJSON()),
    };
  }
}
