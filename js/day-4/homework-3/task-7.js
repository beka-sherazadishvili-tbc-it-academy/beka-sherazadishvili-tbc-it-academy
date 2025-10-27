'use strict'

function intersection(arr1, arr2) {
    try {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) { 
            throw new TypeError("Input must be an array") 
        };

        return arr1.filter(element1 => arr2.some(element2 => element2 === element1));
    }catch (err) {
        return err.messahe;
    }
}
