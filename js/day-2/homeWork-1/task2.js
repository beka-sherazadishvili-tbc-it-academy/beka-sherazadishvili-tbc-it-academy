'use strict'
import { numberValidator, convertStringToNumber } from "./helpers.js"

//get minimum number
function getMinimum(num1, num2) {
    num1 = convertStringToNumber(num1);
    num2 = convertStringToNumber(num2);

    const errorNum1 = numberValidator(num1);
    const errorNum2 = numberValidator(num1);

    return (errorNum1 || errorNum2) || (num1 > num2 ? num2 : num1);
}

//get aabsolute value
function getAbsoluteValue(number) {
    number = convertStringToNumber(number);

    if(isNaN(number)) {
        return 'Please enter an number';
    }

    return number < 0 ? 'Please enter positive number': number;
}

//greeting
function getLoginGreeting(isLoggedIn) {
    if(typeof isLoggedIn !== 'boolean') {
        return 'please enter only boolean value'
    }

    return isLoggedIn ? 'Welcome back!': 'Please log in.';
}

// Even or Odd & Voting Eligibility
function checkEvenOrOdd(number) {
    number = convertStringToNumber(number);

    const error = numberValidator(number);

    return error || ((number % 2 === 0) ? 'Even' : 'Odd');
}
