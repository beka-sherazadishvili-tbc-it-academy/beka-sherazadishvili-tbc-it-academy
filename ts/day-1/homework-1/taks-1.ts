abstract class LibraryItem {
  protected readonly id: string;
  title: string;
  private _available: boolean;

  constructor(id: string, title: string, available: boolean = true) {
    this.id = id;
    this.title = title;
    this._available = available;
  }

  borrow():void {
    if (!this._available) {
      throw new Error("already borrowed");
    }
    this._available = false;
  }

  return():void {
    if (this._available) {
      throw new Error("Not borrowed");
    }

    this._available = true;
  }

  isAvailable() {
    return this._available;
  }

   abstract getLabel() : string;
}

class book extends LibraryItem {
  author: string;

  constructor(
    id: string,
    title: string,
    available: boolean = true,
    author: string
  ) {
    super(id, title, available);
    this.author = author;
  }

  getLabel(): string {
      return `Book: ${this.title} by ${this.author}`
  }
}

class Dvd extends LibraryItem {
  durationMin: number;

  constructor(
    id: string,
    title: string,
    available: boolean = true,
    durationMin: number
  ) {
    super(id, title, available);
    this.durationMin = durationMin;
  }

  getLabel(): string {
      return `durationMin: ${this.title} ${this.durationMin} min`
  }
}
 