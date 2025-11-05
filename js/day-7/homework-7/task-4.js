'use strict'

class User {
    #id;
    #email;

    constructor(id, email) {
        if(typeof id !== 'string' || typeof email !== 'string') {
            throw new Error('INVALID_USER');
        }

        if (!/^[A-Z0-9]{6}$/.test(id)) {
            throw new Error('INVALID_USER');
        }

        if(email.split('@').length !== 2) {
            throw new Error('INVALID_USER');
        }

        this.#id = id;
        this.#email = email;
    }

    id() {
        return this.#id
    }

    email() {
        return this.#email;
    }

    toString() {
        return `USER:${this.#id}|${this.#email}`;
    }
}

class UserRegistry {
    #byId = new Map();

    add(u) {
        if(!(u instanceof User)) {
            throw new Error('invalid User object')
        }

        if(this.#byId.has(u.id())) {
            throw new Error('DUPLICATE_ID');
        }

        this.#byId.set(u.id(), u);
    }

    remove(id) {
        if(typeof id !== 'string') {
            throw new Error('invalid ID')
        }

        if(!this.#byId.has(id)) {
            throw new Error('NOT_FOUND');
        }

        this.#byId.delete(id);
    }

    findByDomain(domain) {
        if(typeof domain !== 'string') {
            throw new Error('invalid Domain')
        }

        const suffix = '@' + domain;

        return Array.from(this.#byId.values())
            .filter(u => u.email().endsWith(suffix))
            .sort((a, b) => a.id().localeCompare(b.id()));
    }
}
