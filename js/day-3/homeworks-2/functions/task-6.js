'use strict'

const toCelsius = (f) => {
    f = Number(f);

    try {
        if(isNaN(f)) {
            throw new Error('Please enter an number');
        }

        if(!isFinite(f)) {
            throw new  Error('please dont enter infinite number');
        }

        return (f - 32) * 5 / 9;
    } catch (err) {
        return err.message;
    }
}

const toFahrenheit = (c) => {
    c = Number(c);

    try {
        if(isNaN(c)) {
            throw new Error('Please enter an number');
        }

        if(!isFinite(c)) {
            throw new  Error('please dont enter infinite number');
        }

        return (c * 9 / 5) + 32;
    } catch (err) {
        return err.message;
    }
}
