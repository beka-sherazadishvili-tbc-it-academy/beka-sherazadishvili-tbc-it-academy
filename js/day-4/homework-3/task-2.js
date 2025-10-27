'use strict'

function maxInArray(arr) {
    try {
        if (!Array.isArray(arr)) { throw new TypeError("input must be an array") };
        if (arr.length === 0) throw new Error("array is empty");
        const numbers = arr.map(element => Number(element)).filter(element => isFinite(element));

        return numbers.reduce((max, curr) => max > Number(curr)? max: curr) 
    } catch (err) {
        return err.message;
    }
}

function minInArray(arr) {
    try {
        if (!Array.isArray(arr)) { throw new TypeError("input must be an array") };
        if (arr.length === 0) { throw new Error("array is empty") };
        const numbers = arr.map(element => Number(element)).filter(element => isFinite(element));

        return numbers.reduce((min, curr) => min < Number(curr)? min: curr)
    } catch (err) {
        return err.message;
    }
}
