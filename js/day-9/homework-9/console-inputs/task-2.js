'use strict'

import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

const randomNum = Math.floor(Math.random() * 10) + 1;

let guessNumber = Number(await rl.question('Guess the number(1-10): '));

while(true) {
    if(isNaN(guessNumber)) {
        console.log('please enter a number');
        guessNumber = Number(await rl.question('Guess the number (1-10): '));
        continue;
    }

    if(!isFinite(guessNumber)) {
        console.log('please dont enter infinite number');
        guessNumber = Number(await rl.question('Guess the number (1-10): '));
        continue;
    }

    if(guessNumber < 1 || guessNumber > 10) {
        console.log('please enter number between 1 and 10');
        guessNumber = Number(await rl.question('Guess the number (1-10): '));
        continue;
    }

    if(guessNumber < randomNum){
        console.log('Too low! Try again.');
    } else if (guessNumber > randomNum) {
        console.log('Too high! Try again.');
    } else {
        console.log(`Correct! The number was ${randomNum}`);
        rl.close();
        break;
    }

    guessNumber = Number(await rl.question('Guess the number(1-10): '));
}
