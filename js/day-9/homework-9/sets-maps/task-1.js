'use strict'

function uniqueWords(text) {
    try {
        if(typeof text !== 'string') {
            throw new Error('please enter string value')
        }

        if(text.trim() === '') {
            return new Set();
        }

        const arr = text.toLocaleLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(' ');

        return  new Set(arr);
    } catch (err) {
        return err.message;
    }
}

console.log(uniqueWords('beka. /beka beka'));