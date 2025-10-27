'use strict'

function moveZeroes(arr) {
    try {
        if (!Array.isArray(arr)) { throw new TypeError("Input must be an array") };

        const filteredArr = arr.filter(element => element !== 0);

        return filteredArr.concat(new Array(arr.length - filteredArr.length).fill(0));
    }catch(err) {
        return err.message;
    }
}
