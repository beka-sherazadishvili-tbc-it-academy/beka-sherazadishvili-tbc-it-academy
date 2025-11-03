'use strict'

function cleanObject(obj) {
    try {
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            throw new Error('please enter object value');
        }

        const newObj = {};
        for(let key in obj) {
            if(!obj[key]) {
                continue;
            }

            newObj[key] = obj[key];
        }

        return newObj;
  } catch (err) {
        return err.message;
  }
}