'use strict'

//number guessing game
function playGuessingGame() {
    const randomNumber = 5;
    let userNumber = null;

    while(userNumber !== randomNumber) {
        const input = parseInt(prompt("Guess the number between 1 and 20: "));

        if(isNaN(input) || input < 1 || input > 20) {
            alert('please enter number in the range');
            continue;
        }
        
        if(input > randomNumber){
            alert('Too high');
        } else if (input < randomNumber) {
            alert('Too low');
        }

        userNumber = input;
    }

    return alert('Correct! You win."');
}

//reverse digits
function reverseDigits(number) {
    let reverse = 0;

    if(isNaN(number) || !isFinite(number) || !Number.isInteger(number)) {
        return 'please enter integer number'
    }

    while(number > 0) {
        reverse =+ reverse * 10 + number % 10;
        number = (number - number % 10) / 10;
    }

    return reverse
}
