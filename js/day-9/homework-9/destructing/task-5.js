'use strict'

function normalizeProfile(input) {
    try {    
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            throw new Error('please enter object value');
        }

        const {
            id,
            user: {first: name, last: surname, city = 'unknown'} = {},
            meta: {lang = 'en'} = {},
        } = input;

        return {id, name, surname, city, lang};
    } catch (err) {
       return err.message; 
    }
}
