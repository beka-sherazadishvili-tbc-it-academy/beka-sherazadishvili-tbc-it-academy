'use strict'

function uniqueChars(str) {
    try {
        if(typeof str !== 'string') {
            throw new Error('please enter string value')
        }

        if(str.trim() === '') {
            return new Set();
        }

        const arr = str.toLocaleLowerCase()
            .replaceAll(" ", '')
            .split('');

        return new Set(arr);
    } catch (err) {
        return err.message;
    }
} 
