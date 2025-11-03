'use strict'

function invert(obj) {
    try {
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            throw new Error('please enter a plain object');
        }

        const newObj = {};

        for(let k in obj) {
            newObj[obj[k]] = k;
        }

        return newObj;
    } catch (err) {
        return err.message;
    }
}
