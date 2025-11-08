'use strict';

export function add(a, b) {
    [a, b] = validateParameters(a, b);

    return a + b;
}

export function subtract(a, b) {
    [a, b] = validateParameters(a, b);

    return a - b;
}

export function multiply(a, b) {
    [a, b] = validateParameters(a, b);

    return a * b;
}

export function divide(a, b) {
    [a, b] = validateParameters(a, b);

    if (b === 0) {
        throw new Error("DIVIDE_BY_ZERO");
    }
    return a / b;
}

function validateParameters(a, b) {
    if(a === null || a === undefined || b === null || b === undefined) {
        throw new Error('Value cannot be null or undefined');
    }

    a = Number(a);
    b = Number(b);

    if(isNaN(a) || isNaN(b)) {
        throw new Error('Please enter an number');
    }

    if(!isFinite(a) || !isFinite(b)) {
        throw new Error('please dont enter infinite number');
    }

    return [a, b]
}