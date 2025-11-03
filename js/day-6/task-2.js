'use strict'

const person = {
    firstName: 'beka',
    lastName: 'shera',
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(value) {
        try {
            if(typeof value !== 'string') {
                throw new Error('please enter string value');
            }

            const arr = value.trim().split(' ');
            if(arr.length !== 2) {
                throw new Error('please enter only firstName and lastName')
            }

            this.firstName = arr[0];
            this.lastName = arr[1];
        } catch (err) {
            return err.message;
        }
    }
}
