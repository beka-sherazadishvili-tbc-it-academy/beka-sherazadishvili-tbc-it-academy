interface Entity {
  id: string;
}

class InMemoryRepo<T extends Entity> {
  private store: Map<string, T>;

  constructor(store: Map<string, T>) {
    this.store = store;
  }

  add(entity: T): void {
    if (this.store.has(entity.id)) {
      throw new Error("already exists");
    }

    this.store.set(entity.id, entity);
  }

  get(id: string): T | undefined {
    return this.store.get(id);
  }

  update(id: string, patch: Partial<Omit<T, "id">>): T {
    const idExists = this.store.get(id);
    if (!idExists) {
      throw new Error("not found");
    }

    const newEntity: T = {
      ...idExists,
      ...patch,
    };

    this.store.set(id, newEntity);
    return newEntity;
  }

  remove(id: string): boolean {
    return this.store.delete(id);
  }

  all(): T[] {
    return Array.from(this.store.values());
  }
}
