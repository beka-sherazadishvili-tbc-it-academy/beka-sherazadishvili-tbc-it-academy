'use strict'
import {convertStringToNumber, numberValidator, round2 } from './errorHandling.js';

class Employee {
    #name;
    #monthlyGross;

    constructor(name, monthlyGross) {
        if(typeof name !== 'string') {
            throw new Error('invalid name');
        }

        monthlyGross = convertStringToNumber(monthlyGross);
        numberValidator(monthlyGross);

        if(monthlyGross <= 0) {
            throw new Error('gross can not be negative');
        }

        this.#name = name;
        this.#monthlyGross = round2(monthlyGross);
    }

    net(taxPct) {
        taxPct = convertStringToNumber(taxPct);
        numberValidator(taxPct);

        return round2(this.#monthlyGross * (1 - taxPct / 100));
    }

    toString() {
        return `EMP:${this.#name}|GROSS=${this.#monthlyGross}`;
    }

    getMonthlyGross() {
        return this.#monthlyGross;
    }
}

class Manager extends Employee {
    #band;

    constructor(name, monthlyGross, band) {
        super(name, monthlyGross);

        const bandArr = ['M1', 'M2', 'M3'];

        if (typeof band !== 'string' || !bandArr.includes(band)) {
            throw new Error('Invalid band');
        }

        this.#band = band;
    }

    bonus() {
        const bonusRates = {
            'M1': 5,
            'M2': 10,
            'M3': 15
        };

        return round2(this.getMonthlyGross() * bonusRates[this.#band] / 100);
    }

    toString() {
        return `${super.toString()}|BAND=${this.#band}|BONUS=${this.bonus()}`;
    }
}
