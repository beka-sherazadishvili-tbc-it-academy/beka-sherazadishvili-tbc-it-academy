'use strict'

const car = {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    info() {
        return `"${this.brand} ${this.model} (${this.year})".`;
    }
}
