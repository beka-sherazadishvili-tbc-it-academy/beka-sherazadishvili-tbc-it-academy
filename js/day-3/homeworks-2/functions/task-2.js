'use strict'

function normalizeSpaces(text) {
    try {
        let char = ' ';
        let newString = '';

        if(typeof text !== 'string') {
            throw new Error('please enter string values');
        }
        
        for(let i = 0; i < text.length; i++) {
            if(i === 0 && text[i] === char) {
                continue;
            }

            if(i === text.length - 1 && text[i] === char) {
                continue;
            }

            if(text[i] === char && text[i - 1] === char) {
                continue;
            }

            newString += text[i];
        }

        return newString;
    } catch (err) {
        return err.message;
    }

}
