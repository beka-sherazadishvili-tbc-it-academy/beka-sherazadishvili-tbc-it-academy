'use strict'

function transform(n, steps, ruleFn, done) {
    try {
        n = Number(n);
        steps = Number(steps);

        if(isNaN(n) || isNaN(steps)) {
            throw new Error('Please enter an number');
        }

        if(!isFinite(n) || !isFinite(steps)) {
            throw new  Error('please dont enter infinite number');
        }

        if(steps < 0) {
            throw new Error('invalid');
        }

        for (let i = 0; i < steps; i++) {
            n = ruleFn(n);
        }

        return done(true, n);
    } catch (err) {
        return done(false, err.message);
    }
}

const numberTransformer = (x) => x * 2 + 1;

const done = (isfinished, result) => { console.log(isfinished, result) };
