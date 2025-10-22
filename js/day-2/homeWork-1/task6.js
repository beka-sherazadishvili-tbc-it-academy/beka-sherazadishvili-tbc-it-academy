'use strict'

function sumUntilNegative(){
    let sum = 0;
    let userinput;

    do {
        userinput = parseInt(prompt('please enter an integer number to sum up'));

        if(isNaN(userinput)) {
            alert('please enter the number')
        }

        if(!isFinite(userinput) || !Number.isInteger(userinput)) {
            alert('please enter finite integer number')
        }

        if(userinput >= 0) {
            sum += userinput;
        }
    } while(userinput >= 0);

    return alert(`Total sum is ${ sum }`);
}