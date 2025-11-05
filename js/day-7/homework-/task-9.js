'use strict'
import {convertStringToNumber, numberValidator, round2 } from './errorHandling.js';


class BankAccount {
    #balance;

    constructor(initialBalance = 0) {
        initialBalance = convertStringToNumber(initialBalance);
        numberValidator(initialBalance);

        if(initialBalance < 0) {
            throw new Error('initial balance cannot be negative');
        }

        this.#balance = round2(initialBalance);
    }

    deposit(amount) {
        amount = convertStringToNumber(amount);
        numberValidator(amount);
        amount = round2(amount);

        if(amount <= 0) {
            throw new Error('INVALID_AMOUNT');
        }

        this.setBalance(round2(this.getBalance() + amount))
    }

    withdraw(amount) {
        amount = convertStringToNumber(amount);
        numberValidator(amount);
        amount = round2(amount);

        if(amount <= 0) {
            throw new Error('INVALID_AMOUNT');
        }

        if(amount > this.getBalance()) {
            throw new Error('INSUFFICIENT_FUNDS');
        }

        this.setBalance(round2(this.getBalance() - amount));
    }

    getBalance() {
        return this.#balance;
    }

    setBalance(balance) {
        this.#balance = balance;
    }
}
