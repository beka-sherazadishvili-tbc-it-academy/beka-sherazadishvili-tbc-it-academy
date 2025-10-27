'use strict'

function flatten(arr) {
    try {
        if (!Array.isArray(arr)) { 
            throw new TypeError("Input must be an array") 
        };

        const hasArrayInIt = arr.some(element => Array.isArray(element));

        if(hasArrayInIt) {
            arr = flatten(arr.flat());
        }

        return arr;
    }catch (err) {
        return err.messahe;
    }
}

function flattenWithoutHelpers(arr) {
    try {
        if (!Array.isArray(arr)) { 
            throw new TypeError("Input must be an array") 
        };

        let newArr = [];
        let index = 0;
        
        for (let i = 0; i < arr.length; i++) {
            if(Array.isArray(arr[i])) {
                const flattenArr = flattenWithoutHelpers(arr[i]);
                for (let j = 0; j < flattenArr.length; j++) {
                   newArr[index] = flattenArr[j];
                   index++;
                }
            } else {
                newArr[index] = arr[i];
                index++;
            }
        }

        return newArr;
    }catch (err) {
        return err.message;
    }
}
