'use strict'

function sumUntilNegative(){
    let sum = 0;
    let number;

    do {
        number = parseInt(prompt('please enter an integer number to sum up'));

        if(isNaN(number)) {
            alert('please enter the number')
        }

        if(!isFinite(number) || !Number.isInteger(number)) {
            alert('please enter finite integer number')
        }

        if(number >= 0) {
            sum += number;
        }
    } while(number >= 0);

    return alert(`Total sum is ${ sum }`);
}