'use strict'
import {convertStringToNumber, numberValidator } from './errorHandling.js';

class ParkingLot {
    #capacity;
    #cars = new Set();

    constructor(capacity) {
        capacity = convertStringToNumber(capacity);
        numberValidator(capacity);

        if(capacity < 0) {
            throw new Error('capacity can not be negative');
        }

        this.#capacity = capacity;
    }

    park(plate) {
        if(typeof plate !== 'string') {
            throw new Error("Invalid type");
        }

        if(this.#cars.size >= this.#capacity) {
            throw new Error("FULL");
        }

        if(this.#cars.has(plate)){
            throw new Error("DUPLICATE");
        }

        this.#cars.add(plate);
    }

    leave(plate) {
        if(typeof plate !== 'string') {
            throw new Error("Invalid type");
        }

        if(!this.#cars.has(plate)){
            throw new Error("NOT_FOUND");
        }

        this.#cars.delete(plate);
    }

    isFull() {
        return this.#cars.size >= this.#capacity;
    }

    count() {
        return this.#cars.size;
    }
}
