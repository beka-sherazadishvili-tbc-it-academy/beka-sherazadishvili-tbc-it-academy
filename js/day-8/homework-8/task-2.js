'use strict'

function aaddAsync(a, b) {
    return new Promise((res, rej) => {
        if(a === null || a === undefined || b === null || b === undefined) {
            rej(new Error('Value cannot be null or undefined'));
            return;
        }

        a = Number(a);
        b = Number(b);

        if(isNaN(a) || isNaN(b)) {
            rej(new Error('Please enter an number'));
            return;
        }

        if(!isFinite(a) || !isFinite(b)) {
            rej(new Error('please dont enter infinite number'));
            return;
        }

        res(a + b);
    })
}