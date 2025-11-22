export interface ICard {
  id: string;
  title: string;
  description?: string;
  labels: string[];
  createdAt: string;
  dueDate: string | null;
}

export class Card implements ICard {
  private _id: string;
  private _title: string;
  private _description: string;
  private _labels: string[];
  private _createdAt: string;
  private _dueDate: string | null;

  constructor(
    id: string,
    title: string,
    description: string = "",
    labels: string[] = [],
    createdAt: string = new Date().toISOString(),
    dueDate: string | null = null
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._labels = labels;
    this._createdAt = createdAt;
    this._dueDate = dueDate;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get labels(): string[] {
    return this._labels;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get dueDate(): string | null {
    return this._dueDate;
  }

  static fromJSON(obj: ICard) {
    return new Card(
      obj.id,
      obj.title,
      obj.description ?? "",
      obj.labels ?? [],
      obj.createdAt ?? new Date().toISOString(),
      obj.dueDate ?? null
    );
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      labels: this._labels,
      createdAt: this._createdAt,
      dueDate: this._dueDate,
    };
  }
}
