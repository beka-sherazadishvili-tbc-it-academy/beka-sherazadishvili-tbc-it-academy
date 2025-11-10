'use strict'

import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

let num1 = await rl.question('Enter first Number: ');
let num2 = await rl.question('Enter second Number: ');
const operator = await rl.question('Choose operation (+, -, *, /): ');

num1 = Number(num1);
num2 = Number(num2)

if(isNaN(num1) || isNaN(num2)) {
    console.log('please enter a number');
    rl.close();
    process.exit(1);
}

if(!isFinite(num1) || !isFinite(num2)) {
    console.log('please dont enter infinite number');
    rl.close();
    process.exit(1);
}

switch(operator) {
    case '+': console.log('Result: ' + (num1 + num2)); break;
    case '-': console.log('Result: ' + (num1 - num2)); break;
    case '*': console.log('Result: ' + (num1 * num2)); break;
    case '/': console.log('Result: ' + (num1 / num2)); break;
    default: console.log('Invalid operator');
}

rl.close();