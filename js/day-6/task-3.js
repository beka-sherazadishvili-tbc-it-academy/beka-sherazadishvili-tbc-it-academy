'use strict'

const constants = {
    PI: 3.14,
}

Object.defineProperty(constants, "PI", {
    writable: false,
});

try {
    constants.PI = 99;
}catch (err) {
    console.error(err.message);
}

console.log(constants.PI); //prints 3.14