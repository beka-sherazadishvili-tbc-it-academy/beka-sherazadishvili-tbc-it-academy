'use strict'

function groupBy(arr, property) {
    try {
        if (!Array.isArray(arr)) {
            throw new Error('please enter an array');
        }

        return arr.reduce((acc, obj) => {
            if (obj[property] === undefined || obj[property] === null) {
                return acc;
            }

            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }

            const info = Object.entries(obj)
                .filter(([key]) => key !== property)
                .map(([_, value]) => String(value).toLowerCase())
                .join(' ');

            acc[key].push(info);
            return acc;
    }, {});
    } catch (err) {
        return err.message;
    }
}
