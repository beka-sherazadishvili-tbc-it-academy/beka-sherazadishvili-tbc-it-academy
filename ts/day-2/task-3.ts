type TtlItems<T> = {
  key: string;
  value: T;
  expiresAt: number | undefined;
};

class TtlCache<T> {
  private store: TtlItems<T>[];

  constructor() {
    this.store = [];
  }

  set(key: string, value: T, ttlMs?: number | undefined): void {
    if (ttlMs! <= 0) {
      throw new Error("ms can not be below or qeual to zero");
    }

    const expiresAt = ttlMs ? Date.now() + ttlMs : undefined;

    const existingItem = this.store.find((item) => item.key === key);

    if (existingItem) {
      existingItem.value = value;
      existingItem.expiresAt = expiresAt!;
      return;
    }

    this.store.push({ key, value, expiresAt });
  }

  get(key: string): TtlItems<T> | undefined {
    const itemIndex = this.store.findIndex((item) => item.key === key);

    if (itemIndex === -1) {
      return undefined;
    }

    const item = this.store[itemIndex];

    if (item?.expiresAt !== undefined && item.expiresAt < Date.now()) {
      this.store.splice(itemIndex, 1);
      return undefined;
    }

    return item;
  }

  has(key: string): boolean {
    const itemIndex = this.store.findIndex((item) => item.key === key);

    if (itemIndex === -1) {
      return false;
    }

    const item = this.store[itemIndex];

    if (item?.expiresAt !== undefined && item.expiresAt < Date.now()) {
      return false;
    }

    return true;
  }

  delete(key: string) {
    const itemIndex = this.store.findIndex((item) => item.key === key);

    if (itemIndex === -1) {
      return false;
    }

    this.store.splice(itemIndex, 1);
    return true;
  }

  clearExpired(): void {
    this.store = this.store.filter(
      (item) => item.expiresAt === undefined || item.expiresAt >= Date.now()
    );
  }
}
