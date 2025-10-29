'use strict'

function firstUniqueChar(str) {
    try {
        if(typeof str !== 'string') {
            throw new Error('please enter string values');
        }

        for (let i = 0; i < str.length; i++) {
            if(str.split(str[i]).length === 2) {
                return str[i];
            }
        }

        return null;
    } catch (err) {
        return err.message;
    }
}
