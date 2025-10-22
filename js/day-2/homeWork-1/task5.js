'use strict'

//number guessing game
function playGuessingGame() {
    const secretNumber = 5;
    let guess = null;

    while(guess !== secretNumber) {
        guess = parseInt(prompt("Guess the number between 1 and 20: "));

        if(isNaN(guess) || guess < 1 || guess > 20) {
            alert('please enter number in the range');
            continue;
        }
        
        if(guess > secretNumber){
            alert('Too high');
        } else if (guess < secretNumber) {
            alert('Too low');
        }
    }

    return alert('Correct! You win."');
}

//reverse digits
function reverseDigits(input) {
    let output = 0;

    if(isNaN(input) || !isFinite(input) || !Number.isInteger(input)) {
        return 'please enter integer number'
    }

    while(input > 0) {
        output =+ output * 10 + input % 10;
        input = (input - input % 10) / 10;
    }

    return output;
}

console.log(reverseDigits(123))