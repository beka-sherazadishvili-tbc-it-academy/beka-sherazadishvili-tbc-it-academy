import fs from "fs";
import path from "path";

class CommonController {
  #items = new Map();
  #counter = 0;
  #currentClass;
  #path;

  constructor(currentClass, filePath = null) {
    this.#currentClass = currentClass;
    this.#path = filePath;

    if (this.#path) {
      this.#load();
    }
  }

  getItemById(id) {
    return this.#items.get(id) || null;
  }

  getAllItems() {
    return this.#items;
  }

  getAllValues() {
    return [...this.#items.values()];
  }

  clearAll() {
    this.#items.clear();
    this.#counter = 0;
    this.#save();
  }

  add(item) {
    if (!(item instanceof this.#currentClass)) {
      throw new Error(`Object must be instance of ${this.#currentClass.name}`);
    }

    if (!item.id) {
      item.id = ++this.#counter;
    }

    if (this.#items.has(item.id)) {
      throw new Error(`Item with ID ${item.id} already exists`);
    }

    this.#items.set(item.id, item);
    this.#save();
  }

  #save() {
    if (!this.#path) return;

    const dir = path.dirname(this.#path);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const arr = [...this.#items.values()];
    fs.writeFileSync(this.#path, JSON.stringify(arr, null, 2));
  }

  #load() {
    if (!fs.existsSync(this.#path)) return;

    const raw = fs.readFileSync(this.#path, "utf8");
    const arr = JSON.parse(raw || "[]");

    let maxId = 0;

    arr.forEach((dataObj) => {
      const instance = this.#currentClass.fromJSON
        ? this.#currentClass.fromJSON(dataObj)
        : new this.#currentClass(...Object.values(dataObj));

      this.#items.set(instance.id, instance);

      if (instance.id > maxId) maxId = instance.id;
    });

    this.#counter = maxId;
  }
}

export { CommonController };
