'use strict'

function numberValidator(number) {
    if(number === null || number === undefined) {
        throw new Error('Value cannot be null or undefined');
    }

    if(isNaN(number)) {
        throw new Error('Please enter an number');
    }

    if(!isFinite(number)) {
        throw new Error ('please dont enter infinite number');
    }

    return null;
}

function convertStringToNumber(number){
    if(typeof number === 'number') {
        return number;
    }

    if (typeof number === 'string') {
        if(number.trim() === '') {
            throw new Error('string cannot be empty');
        }
        
        const converted = Number(number);
        
        if(isNaN(converted)) {
            throw new Error(`cannot convert "${number}" to a number`);
        }
        
        return converted;
    }

    throw new Error('Invalid type: must be number or string');
}

function round2(k) {
    return Math.round(k * 100) / 100;
}

module.exports = { convertStringToNumber, numberValidator, round2 };