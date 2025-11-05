'use strict'

class Password {
    #value;

    constructor(password) {
        if (typeof password !== 'string') {
            throw new Error('please neter string value')
        }

        this.#value = password;
    }

    isValid() {
        return this.#value.length >= 8 &&
            this.#value !== this.#value.toLowerCase() &&
            this.#value !== this.#value.toUpperCase() &&
            /\d/.test(this.#value) &&
            /[!@#\$%\^&\*]/.test(this.#value);
    }

    mask() {
        return this.#value.split('').map(() => '*').join('');
    }
}
