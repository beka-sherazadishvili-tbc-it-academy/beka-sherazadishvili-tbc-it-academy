'use strict'

function sumArray(arr) {
    try {
        if (!Array.isArray(arr)) { throw new TypeError("Input must be an array") };
        const numbers = arr.map(element => Number(element)).filter(element => isFinite(element));

        return numbers.reduce((acc, current) => acc + Number(current), 0);
    } catch (err) {
        return err.message;
    }
}
