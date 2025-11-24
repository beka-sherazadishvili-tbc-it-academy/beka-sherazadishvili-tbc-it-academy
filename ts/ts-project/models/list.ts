export interface IList {
  id: string;
  name: string;
  cardOrder: string[];
}

export class List implements IList {
  private _id: string;
  private _name: string;
  private _cardOrder: string[];

  constructor(id: string, name: string, cardOrder: string[] = []) {
    this._id = id;
    this._name = name;
    this._cardOrder = cardOrder;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get cardOrder(): string[] {
    return this._cardOrder;
  }

  public static fromJSON(obj: IList) {
    return new List(obj.id, obj.name, obj.cardOrder ?? []);
  }

  public toJSON() {
    return {
      id: this._id,
      name: this._name,
      cardOrder: this._cardOrder,
    };
  }
}
