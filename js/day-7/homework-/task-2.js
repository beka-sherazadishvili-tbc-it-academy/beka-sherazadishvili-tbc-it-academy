'use strict'
import {convertStringToNumber, numberValidator, round2 } from './errorHandling.js';

class Product {
    constructor(sku, price) {
        if (typeof sku !== 'string' || sku.trim() === '' || typeof price !== 'number' || price <= 0) {
            throw new Error('INVALID_PRODUCT');
        }

        price = convertStringToNumber(price);
        numberValidator(price);

        this.sku = sku;
        this.price = price
    }
}

class Cart {
    #items = [];

    add(product, quantity) {
        quantity = convertStringToNumber(quantity);
        numberValidator(quantity);

        if(!(product instanceof Product) || !Number.isInteger(quantity)) {
            throw new Error('please enter a product intance');
        }

        const alreadyExists = this.#items.find(item => item.sku === product.sku);

        if(alreadyExists) {
            alreadyExists.qty += quantity;
        } else {
            this.#items.push({sku: product.sku, qty: quantity, unit: product.price})
        }
    }

    remove (sku, quantity) {
        quantity = convertStringToNumber(quantity);
        numberValidator(quantity);

        if (typeof sku !== 'string' || !Number.isInteger(quantity) || quantity < 1) {
            throw new Error('INVALID_REMOVE');
        } 

        const alreadyExists = this.#items.find(item => item.sku === sku);

        if(!alreadyExists) {
            throw new Error('INVALID_REMOVE');
        }

        if(alreadyExists.qty < quantity) {
            throw new Error('INVALID_REMOVE');
        }

        alreadyExists.qty -= quantity;

        if(alreadyExists.qty === 0) {
            this.#items.splice(this.#items.indexOf(alreadyExists), 1);
        }
    }

      total({ discountPct = 0, vatPct = 0 } = {}) {
        discountPct = convertStringToNumber(discountPct);
        numberValidator(discountPct);

        vatPct = convertStringToNumber(vatPct);
        numberValidator(vatPct);

        const subtotal = this.#items.reduce((sum, item) => sum + item.qty * item.unit, 0);
        const discount = round2(subtotal * (discountPct / 100));
        const vat = round2((subtotal - discount) * (vatPct / 100));
        const grand = round2(subtotal - discount + vat);

        return `SUB=${subtotal.toFixed(2)};DISC=${discount.toFixed(2)};VAT=${vat.toFixed(2)};TOTAL=${grand.toFixed(2)}`;
    }
}
