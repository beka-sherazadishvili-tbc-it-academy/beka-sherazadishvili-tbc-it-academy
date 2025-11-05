'use strict'
import {convertStringToNumber, numberValidator, round2 } from './errorHandling.js';

class Show {
    #title
    #rows
    #cols
    #seats

    constructor(title, rows, cols) {
        if(typeof title !== 'string') {
            throw new Error('please enter string value')
        }

        rows = convertStringToNumber(rows);
        numberValidator(rows);

        cols = convertStringToNumber(cols);
        numberValidator(cols);

        if(rows < 1 || cols < 1) {
            throw new Error('INVALID_SHOW');
        }

        if(!Number.isInteger(rows) || !Number.isInteger(cols)) {
            throw new Error("please enter integer numbers");
        }

        this.#title = title;
        this.#rows = rows;
        this.#cols = cols;

        this.#seats = [];
        for (let i = 0; i < rows; i++) {
            this.#seats[i] = []
            for (let j = 0; j < cols; j++) {
                this.#seats[i][j] = '.'    
            }
        }
    }

    labelOf(rowIndex, colIndex) {
        rowIndex = convertStringToNumber(rowIndex);
        numberValidator(rowIndex);

        colIndex = convertStringToNumber(colIndex);
        numberValidator(colIndex);

        if(!Number.isInteger(rowIndex) || !Number.isInteger(colIndex)) {
            throw new Error("please enter integer numbers");
        }

        if(rowIndex < 0 || colIndex < 0) {
            throw new Error('INVALID_index');
        }

        return String.fromCharCode(65 + rowIndex) + String(colIndex + 1).padStart(2, '0')
    }

    indexOf(label) {
        if(typeof label !== 'string') {
            throw new Error('please enter string value')
        }

        if (!(/^[A-Z][0-9]{2,}$/.test(label))) {
            throw new Error("INVALID_SEAT");
        }

        const rowIndex = label.charCodeAt(0) - 65;

        const colIndex = Number(label.slice(1)) - 1;

          if (rowIndex < 0 || rowIndex >= this.#rows || colIndex < 0 || colIndex >= this.#cols) {
            throw new Error("INVALID_SEAT");
        }

        return {rowIndex, colIndex}
    }


    reserve(label) {
        const seatToReserve = this.indexOf(label);
        const isReserved = this.#seats[seatToReserve.rowIndex][seatToReserve.colIndex] === 'X';

        if(isReserved) {
            throw new Error("TAKEN");
        }

        this.#seats[seatToReserve.rowIndex][seatToReserve.colIndex] = 'X';
    }

    cancel(label) {
        const seatToReserve = this.indexOf(label);
        const isReserved = this.#seats[seatToReserve.rowIndex][seatToReserve.colIndex] === 'X';

        if(!isReserved) {
            throw new Error("NOT_RESERVED");
        }

        this.#seats[seatToReserve.rowIndex][seatToReserve.colIndex] = '.';
    }

    available() {
        return this.#seats.flat().filter(seat => seat === '.').length;
    }
}
