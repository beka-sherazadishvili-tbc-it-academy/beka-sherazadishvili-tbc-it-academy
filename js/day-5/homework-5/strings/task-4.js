'use strict'

function longestWord(str) {
    try {
        if (typeof str !== 'string') {
            throw new Error('please enter string value');
        }

        str = str.split(' ');
        let longest = '';

        for (let i = 0; i < str.length; i++) {
            longest = longest.length >= str[i].length ? longest: str[i];
        }

        return longest;
    } catch (err) {
        return err.message;
    }
}
