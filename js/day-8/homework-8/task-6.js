'use strict'

async function double(x) {
    return new Promise((res) => {
        setTimeout(() => {
            res(x * 2);
        }, 200);
    });
}

async function subtract(x) {
    return new Promise((res) => {
        setTimeout(() => {
            res(x - 3);
        }, 200);
    });
}

async function multiply(x) {
    return new Promise((res) => {
        setTimeout(() => {
            res(x * 5);
        }, 200);
    });
}

async function processx(x) {
    if(x === null || x === undefined) {
        throw new Error('Value cannot be null or undefined');
    }

    if(isNaN(x)) {
        throw new Error('Please enter an x');
    }

    if(!isFinite(x)) {
        throw new Error ('please dont enter infinite x');
    }
        
    const doubled = await double(num);
    const subtracted = await subtract(doubled);
    const multiplied = await multiply(subtracted);
    
    return multiplied;
}