class CommonController {
  #items = new Map();
  #counter = 0;
  #currentClass;

  constructor(currentClass) {
    this.#currentClass = currentClass;
  }

  getStudentById(id) {
    return this.#items.get(id) || null;
  }

  getAllStudents() {
    return this.#items;
  }

  getAllStudentValues() {
    return [...this.#items.values()];
  }

  add(item) {
    if (!(item instanceof this.#currentClass)) {
      throw new Error(`Object is not ${this.#currentClass} instance`);
    }

    if (!item.id) {
      item.id = ++this.#counter;
    }

    if (this.#items.has(item.id)) {
      throw new Error(`item already exists with the same ID`);
    }

    this.#items.set(item.id, item);
  }

  clearAllObject() {
    this.#items.clear();
    this.#counter = 0;
  }

  // getters
  get currentClass() {
    return this.#currentClass;
  }
}

export { CommonController };
