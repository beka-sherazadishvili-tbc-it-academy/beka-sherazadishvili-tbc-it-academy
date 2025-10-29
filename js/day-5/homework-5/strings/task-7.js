'use strict'

function maskDigits(str) {
    try {
        if(typeof str !== 'string') {
            throw new Error('please enter string values');
        }

        str = str.split('');

        for (let i = 0; i < str.length; i++) {
            if(str[i] >= '0' && str[i] <= '9'){
                str[i] = '*';
            }
        }

        return str.join('');
    } catch (err) {
        return err.message;
    }
}
