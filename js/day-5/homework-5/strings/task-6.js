'use strict'

function removeDuplicates(str) {
    try {
        if(typeof str !== 'string') {
            throw new Error('please enter string values');
        }
        
        let newStr = '';

        outerLoop: for (let i = 0; i < str.length; i++) {
            for (let j = 0; j < i; j++) {
                if(str[i] === str[j]) {
                    continue outerLoop;
                }
            }
            newStr += str[i];
        }

        return newStr;
    } catch (err) {
        return err.message; 
    }
}
