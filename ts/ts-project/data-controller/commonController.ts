import fs from "fs";

export abstract class CommonController<T extends { id: string }> {
  private items: Map<string, T> = new Map();
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.load();
  }

  protected abstract fromJSON(obj: any): T;

  protected toJSON(item: T): any {
    return item;
  }

  load() {
    if (!fs.existsSync(this.filePath)) {
      return;
    }

    const newArr = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));

    newArr.array.forEach((obj: T) => {
      const card = this.fromJSON(obj);
      this.items.set(card.id, card);
    });
  }

  save() {
    const newArr = [...this.items.values()].map((item) => this.toJSON(item));
    fs.writeFileSync(this.filePath, JSON.stringify(newArr, null, 2));
  }

  getAll() {
    return [...this.items.values()];
  }

  getItemById(id: string) {
    return this.items.get(id);
  }

  add(item: T) {
    if(this.items.get(item.id)) {
        throw new Error('CONFLICT: item with this id already exists');
    }

    this.items.set(item.id, item);
    this.save();
  }

  update(id: string, item: Partial<T>) {
    if(!this.items.get(id)) {
        throw new Error('NOT_FOUNT: item does not exists with this id')
    }

    const newItem = {...this.items.get(id), ...item} as T;
    this.items.set(id, newItem);
    this.save();
  }

  delete(id: string) {
    if(!this.items.get(id)) {
        throw new Error('NOT_FOUNT: item does not exists with this id')
    }

    this.items.delete(id);
    this.save();
  }
}
