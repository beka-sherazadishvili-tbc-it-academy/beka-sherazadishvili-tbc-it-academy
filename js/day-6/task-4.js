'use strict'

function mergeObjects(obj1, obj2) {
    try {
        if(obj1 === null || obj2 === null) {
            throw new Error('please do not enter null value')
        }

        if(Array.isArray(obj1) || Array.isArray(obj2)) {
            throw new Error('please do not enter array');
        }

        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
            throw new Error('please enter an object');
        }

        let object = {};

        for(let k in obj1) {
            object[k] = obj1[k];
        }

        for(let k in obj2) {
            object[k] = obj2[k];
        }

        return object;
    }catch (err) {
        return err.message;
    }
}
