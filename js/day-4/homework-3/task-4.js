'use strict'

function unique(arr) {
    try {
        if (!Array.isArray(arr)) { throw new TypeError("Input must be an array") };
        
        let unique = [];
        let index = 0;

        outerLoop: for (let i = 0; i < arr.length; i++) {
            for (let j = arr.length - 1; j > i; j--) {
                if (arr[i] === arr[j]) {
                    continue outerLoop;
                }
            }

            unique[index] = arr[i];
            index++;
        }

        return unique;
    }catch (err) {
        return err.message;
    }
}
