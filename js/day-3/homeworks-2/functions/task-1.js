'use strict'

function digitSum(n) {
    try {
        if(isNaN(n)) {
            throw new Error('Please enter an number');
        }

        if(!Number.isInteger(n)) {
            throw new Error('Please enter integer number');
        }

        if(!isFinite(n)) {
            throw new Error('please dont enter infinite number');
        }

        if(n < 0) { n *= (-1); }

        if (n === 0) { return 0 }; 

        return n % 10 + digitSum((n - n % 10) / 10);
    } catch (err) {
        return err.message;
    }
}
