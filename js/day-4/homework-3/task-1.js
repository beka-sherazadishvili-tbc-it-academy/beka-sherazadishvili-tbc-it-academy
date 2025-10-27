'use strict'

function sumArray(arr) {
    try {
        if (!Array.isArray(arr)) { throw new TypeError("Input must be an array") };

        return arr.reduce((acc, current) => acc + Number(current), 0);
    } catch (err) {
        return err.message;
    }
}
