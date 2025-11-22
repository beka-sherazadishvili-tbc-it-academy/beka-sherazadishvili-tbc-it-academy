class BoundedQueue<T> {
    readonly capacity: number;
    private items: T[];

    constructor(capacity: number) {
        this.capacity = capacity;
        this.items = [];
    }

    enqueue(item: T): boolean {
        if(this.capacity === this.items.length) {
            return false;
        }

        this.items.push(item);
        return true;
    }

    dequeue(): T | undefined {
        if(this.items.length === 0) {
            return undefined;
        }

        return this.items.shift();
    }

    peek(): T | undefined {
        if(this.items.length === 0) {
            return undefined;
        }

        return this.items[0];
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}
