'use strict'
import {convertStringToNumber, numberValidator, round2 } from './errorHandling.js';

class BankAccount {
    #balance;
    #transactions;

    constructor(accountNumber, initialBalance = 0) {
        if(typeof accountNumber !== 'string') {
            throw new Error('Invalid AccountNumber type');
        }

        initialBalance = convertStringToNumber(initialBalance);
        numberValidator(initialBalance);

        this.accountNumber = accountNumber;
        this.#balance = round2(initialBalance);
        this.#transactions = [];

        if(initialBalance > 0) {
            this.#transactions.push(`${this.accountNumber} - initial deposit for: ${this.#balance}`);
        }
    }

    roundToTwoDecimals(amount) {
        return Math.round(amount * 100) / 100;
    }

    deposit(amount) {
        try {
            amount = convertStringToNumber(amount);
            numberValidator(amount);
            amount = round2(amount);

            if(amount < 0.01) {
                throw new Error('INVALID_AMOUNT');
            }

            this.#balance = round2(this.#balance + amount);
            this.#transactions.push(`Deposit: +${amount}, Balance - ${this.#balance}`);

            console.log(`deposit → "+${amount}"`);
            return this.#balance
        }catch (err) {
            return err.message;
        }
    }

    withdraw(amount) {
        try {
            amount = convertStringToNumber(amount);
            numberValidator(amount);
            amount = round2(amount);

            if(amount < 0.01) {
                throw new Error('INVALID_AMOUNT');
            }

            if(this.#balance < amount) {
                throw new Error("not sufficient balance");
            }

            this.#balance = round2(this.#balance - amount);
            this.#transactions.push(`Withdraw:  -${amount}, Balance - ${this.#balance}`);

            console.log(`withdraw → "-${amount}"`);
            return this.#balance
        }catch (err) {
            return err.message;
        }
    }

    getBalance() {
        return this.#balance;
    }
    
    printStatement() {
        return this.#transactions.join('\n') + `\nBALANCE=${this.#balance}`;   
    }
}

class SavingsAccount extends BankAccount {
    #rate;

    constructor(accountNumber, initialBalance = 0, rate) {
        super(accountNumber, initialBalance);

        rate = convertStringToNumber(rate);
        numberValidator(rate);

        if(rate < 0 || rate > 1) {
            throw new Error('please enter rate between 0 and 1');
        }

        this.#rate = round2(rate);
    }

    applyMonthlyInterest() {
        let interest  = this.getBalance() * this.#rate / 12;
        interest = round2(interest);

        this.deposit(interest);

        console.log(`interest → "interest=${interest}"`)
        return this.getBalance();
    }
}
