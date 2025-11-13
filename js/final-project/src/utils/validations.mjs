'use strict';

export function isIntegerNumberValidator(...numbers) {
    for (const number of numbers) {
        if (isNaN(number)) {
            throw new Error(`VALIDATION_ERROR: "${number}" is not a number`);
        }

        if (!Number.isInteger(number)) {
            throw new Error(`VALIDATION_ERROR: "${number}" is not an integer`);
        }

        if (!isFinite(number)) {
            throw new Error(`VALIDATION_ERROR: "${number}" is infinite`);
        }
    }
    return true;
}

export function isNumberValidator(...numbers) {
    for (const number of numbers) {
        if (isNaN(number)) {
            throw new Error(`VALIDATION_ERROR: "${number}" is not a number`);
        }

        if (!isFinite(number)) {
            throw new Error(`VALIDATION_ERROR: "${number}" is infinite`);
        }
    }
    return true;
}

export function convertStringToNumber(value) {
    if (typeof value === 'number') {
        return value;
    } 

    if (typeof value === 'string') {
        const converted = Number(value);
        if (isNaN(converted)) {
            throw new Error(`VALIDATION_ERROR: "${value}" cannot be converted to a number`);
        }
        return converted;
    }

    throw new Error(`VALIDATION_ERROR: Value must be a number or string, got "${typeof value}"`);
}

export function isStringValidator(...strings) {
    for (const str of strings) {
        if (typeof str !== 'string') {
            throw new Error(`VALIDATION_ERROR: Expected a string, got "${typeof str}"`);
        }

        if (str.trim() === '') {
            throw new Error('VALIDATION_ERROR: String cannot be empty or whitespace only');
        }
    }
    return true;
}

export function isEmailFormValidator(email) {
    if (email && !/^[^@]+@[^@]+$/.test(email)) {
      throw new Error('VALIDATION_ERROR: Invalid email format');
    }
}
