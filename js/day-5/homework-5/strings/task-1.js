'use strict'

function reverseString(str) {
    try {
        if(typeof str !== 'string') {
            throw new Error('please enter string type')
        }

        return str.split('').reverse().join('');
    }catch(err) {
        return err.message;
    }
}

function reverseStringWithoutHelper(str) {
    try {
        if(typeof str !== 'string') {
            throw new Error('please enter string type')
        }

        let newStr = '';

        for (let i = str.length - 1; i >= 0; i--) {
            newStr += str[i];
        }

        return newStr;
    }catch(err) {
        return err.message;
    }
}

console.log(reverseStringWithoutHelper('hello'));
