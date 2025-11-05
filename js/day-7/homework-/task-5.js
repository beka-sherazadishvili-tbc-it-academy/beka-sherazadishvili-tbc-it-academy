'use strict'
import {convertStringToNumber, numberValidator } from './errorHandling.js';

class ATM {
    #cash;

    constructor(initialCash) {
        initialCash = convertStringToNumber(initialCash);
        numberValidator(initialCash);

        if(!Number.isInteger(initialCash) || initialCash < 0) {
            throw new Error('must be more than or equal 0');
        }

        this.#cash = initialCash;
    }

    deposit(amount) {
        amount = convertStringToNumber(amount);
        numberValidator(amount);

        if(!Number.isInteger(amount)) {
            throw new Error('please enter integer value');
        }

        if(amount <= 0) {
            throw new Error('deposit cant be negative or 0');
        }

        this.#cash += amount;
        return this.#cash;
    }

    withdraw(amount) {
        amount = convertStringToNumber(amount);
        numberValidator(amount);

        if(!Number.isInteger(amount) || amount <= 0) {
            throw new Error('can not withdraw negative or 0 amount');
        }

        if(this.#cash < amount) {
            throw new Error('ATM_EMPTY');
        }

        this.#cash -= amount;
        return this.#cash;
    }

    balance() {
        return this.#cash;
    }
}