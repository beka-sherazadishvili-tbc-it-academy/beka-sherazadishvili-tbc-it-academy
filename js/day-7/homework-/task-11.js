'use strict'

class Vehicle {
    #make;
    #model;

    constructor(make, model) {
        this.#make = make;
        this.#model = model;
    }

    getMake() { return this.#make; }

    getModel() { return this.#model; }

    getDetails() {
        return `${this.getMake()} ${this.getModel()}`;
    }
}

class Car extends Vehicle {
    #door;

    constructor(make, model, door) {
        super(make, model);

        this.#door = door;
    }

    getDoor() { return this.#door; }

    getDetails() {
        return `${super.getDetails()}  ${this.getDoor()}`;
    }
}


class Truck extends Car {
    #payloadCapacity;
    constructor(make, model, door, payloadCapacity) {
        super(make, model, door);

        this.#payloadCapacity = payloadCapacity
    }

    getPayloadCapacity() { return this.#payloadCapacity; }

    getDetails() {
        return `${super.getDetails()} ${this.getPayloadCapacity()}`;
    }
}
