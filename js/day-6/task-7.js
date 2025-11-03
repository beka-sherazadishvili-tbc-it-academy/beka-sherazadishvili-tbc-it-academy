'use strict'

function getValue(obj, path) {
    try {
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            throw new Error('please enter object value');
        }

        if (typeof path !== 'string') {
            throw new Error('please enter string as a path');
        }

        return path.split('.').reduce((acc, key) => {
            if (acc && acc.hasOwnProperty(key)) {
                return acc[key];
            }

            return undefined;
        }, obj);

    } catch (err) {
        return err.message;
    }
}
