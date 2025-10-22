'use strict'

function numberValidator(number) {
    if(isNaN(number)) {
        return 'Please enter an number';
    }

    if(!Number.isInteger(number)) {
        return 'Please enter integer number';
    }

    if(!isFinite(number)) {
        return 'please dont enter infinite number'
    }

    return null;
}

function convertStringToNumber(number){
    if(typeof number === 'number') {
        return number
    }

    if (typeof number === 'string') {
       return number = Number(number);
    }

    return null;
}

function isPrimeNumber(number) {
    for(let i = 2; i < number; i++) {
        if(number % i === 0) {
            return false;
        }
    }

    return true;
}

module.exports = { convertStringToNumber, numberValidator, isPrimeNumber };