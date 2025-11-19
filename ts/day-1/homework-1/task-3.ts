abstract class Shape {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract area(): number;
  abstract perimeter(): number;

  toString() {
    return `${this.name} A=${this.area()} P=${this.perimeter()}`;
  }
}

class Rectangle extends Shape {
  public readonly width: number;
  public readonly height: number;

  constructor(name: string, width: number, height: number) {
    super(name);
    if(width <= 0 || height <= 0) {
        throw new Error('enter width and height more than 0')
    }

    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  public readonly radius: number;

  constructor(name: string, radius: number) {
    super(name);

    if(radius <= 0) {
        throw new Error('enter radius more than 0')
    }

    this.radius = radius;
  }

  area(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  perimeter(): number {
    return 2 * this.radius * Math.PI;
  }
}
