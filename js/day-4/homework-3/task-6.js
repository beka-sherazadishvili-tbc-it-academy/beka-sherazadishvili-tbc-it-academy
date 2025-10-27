'use strict'

function rotate(arr, k) {
    k = Number(k);
    try {
        if (!Array.isArray(arr)) { throw new TypeError("Input must be an array") };

        if(isNaN(k)) {
            throw new Error('please enter an number');
        }

        if(!Number.isInteger(k)) {
            throw new Error('please enter integer number');
        }

        if(!isFinite(k)) {
            throw new Error('please dont enter infinite number');
        }

        if(Math.abs(k) > arr.length) {
            throw new Error('index out of bound error')
        }

        return arr.slice(k).concat(arr.slice(0, k));
    } catch (err) {
        return err.message;
    }
}
