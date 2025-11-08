'use strict';

function wait(ms) {
  return new Promise((res, rej) => {
    if(ms === null || ms === undefined) {
        rej(new Error('Value cannot be null or undefined'));
        return;
    }

    ms = Number(ms);

    if(isNaN(ms)) {
        rej(new Error('Please enter an number'));
        return;
    }

    if(!isFinite(ms)) {
        rej(new Error('please dont enter infinite number'));
        return;
    }

    if (!Number.isInteger(ms) || ms < 0) {
        rej(new Error('ms must be an integer ≥ 0'));
        return;
    }

    setTimeout(() => {
    res(`Waited ${ms} ms`);
    }, ms);
  });
}
