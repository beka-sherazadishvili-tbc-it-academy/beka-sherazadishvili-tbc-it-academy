'use strict'

import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

console.log('Choose conversion type:\n1. C → F\n2. F → C');

const choice = await rl.question('please enter your choice: ');

if(choice === '1') {
    const cel = await rl.question('Enter temperature in celsius: ');
    console.log(`${cel}°C is equal to ${cel * 1.8 + 32}°F`);
    rl.close();
}else if(choice === '2') {
    const fahr = await rl.question('Enter temperature in fahrenheit: ');
    console.log(`${fahr}°F is equal to ${(fahr - 32) * 5 / 9}°C`);
    rl.close();
} else {
    console.log('you must enter 1 or 2 values');
    rl.close();
}

