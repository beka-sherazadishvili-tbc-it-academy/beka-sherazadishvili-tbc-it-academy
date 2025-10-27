'use strict'

function maxInArray(arr) {
    try {
        if (!Array.isArray(arr)) { throw new TypeError("input must be an array") };
        if (arr.length === 0) throw new Error("array is empty");

        return arr.reduce((max, curr) => max > Number(curr)? max: curr) 
    } catch (err) {
        return err.message;
    }
}

function minInArray(arr) {
    try {
        if (!Array.isArray(arr)) { throw new TypeError("input must be an array") };
        if (arr.length === 0) { throw new Error("array is empty") };

        return arr.reduce((min, curr) => min < Number(curr)? min: curr)
    } catch (err) {
        return err.message;
    }
}

console.log(minInArray([1,2,31,23,123,12,312,0,3,12312.32,5334,6,547,563,6]));
