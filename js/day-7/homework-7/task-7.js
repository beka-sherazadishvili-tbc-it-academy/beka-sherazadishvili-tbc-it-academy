'use strict'
import {convertStringToNumber, numberValidator } from './errorHandling.js';

class Flight {
    #code;
    #seats;
    #booked = new Set();

    constructor(code, seats) {
        if(typeof code !== 'string') {
            throw new Error('invalid code');
        }

        seats = convertStringToNumber(seats);
        numberValidator(seats);

        if(seats < 0) {
            throw new Error('seats cannot be negative');
        }

        this.#code = code;
        this.#seats = seats;
    }

    book(name) {
        if(typeof name !== 'string') {
            throw new Error('invalid name');
        }

        if(this.#booked.size >= this.#seats) {
            throw new Error("FULL");
        }

        if(this.#booked.has(name)) {
            throw new Error("DUPLICATE");
        }

        this.#booked.add(name);
    }

    cancel(name) {
        if(typeof name !== 'string') {
            throw new Error('invalid name');
        }

        if(!this.#booked.has(name)) {
            throw new Error("NOT_FOUND");
        }

        this.#booked.delete(name);
    }

    list() {
        return [...this.#booked];
    }

    isavailable() {
        return this.#seats - this.#booked.size;
    }
}
