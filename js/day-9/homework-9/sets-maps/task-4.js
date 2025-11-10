'use strict'

function invertMap(m) {
    try {
        if(!(m instanceof Map)) {
            throw new Error('please enter map value');
        }

        const invertedMap = new Map(); 

        for(let [key, value] of m) {
            if(typeof key !== 'string' || key.trim() ==='') {
                throw new Error('key must be string');
            }

            if(typeof value !== 'number') {
                throw new Error('value must be a number');
            }

            if(isNaN(value)) {
                throw new Error('Please enter an number');
            }

            if(!isFinite(value)) {
                throw new Error('please dont enter infinite number');
            }

            if(invertedMap.has(value)){
                throw new Error('DUPLICATED_VALUE')
            }

            invertedMap.set(value, key)
        }

        return invertedMap;
    } catch (err) {
        return err.message;
    }
}
