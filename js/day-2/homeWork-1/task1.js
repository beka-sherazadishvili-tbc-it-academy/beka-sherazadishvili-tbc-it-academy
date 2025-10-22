'use strict'
import {convertStringToNumber, numberValidator } from './helpers.js';

// Even or Odd & Voting Eligibility
function checkEvenOrOdd(number) {
    number = convertStringToNumber(number);

    const validationError = numberValidator(age);
    if(validationError) {
        return validationError;
    }
    
    if(number % 2 === 0) {
        return 'Even';
    }

    return 'Odd';
}

function checkVotingEligibility(age) {
    age = convertStringToNumber(age);

    const validationError = numberValidator(age);
    if(validationError) {
        return validationError;
    }

    if (age < 0) {
        return 'please enter positive integer number'
    }

    if(age < 18) {
        return 'Too young to vote'
    } else if(age >= 18 && age <= 65) {
        return 'Eligible to vote'
    }

    return 'Eligible for senior voting benefits'
}

// Grade Cheker
function getGrade(score) {
    score = convertStringToNumber(score);

    const validationError = numberValidator(score);
    if(validationError) {
        return validationError;
    }

    if(score > 100 && score < 0) {
        return 'please enter the number between 0 and 100'
    }

    if(score >= 90 && score <= 100) {
        return 'A'
    } else if (score >= 75 && score <= 89) {
        return 'B'
    } else if (score >= 50 && score <= 74) {
        return 'B'
    }

    return 'Fail'
}

//Discount Calculator
function calculateDiscount(totalAmount) {
    totalAmount = convertStringToNumber(totalAmount);

    const validationError = numberValidator(totalAmount);
    if(validationError) {
        return validationError;
    }

    if(totalAmount > 200) {
        return totalAmount * 0.8;
    } else if (totalAmount > 100) {
        return totalAmount * 0.9;
    }

    return totalAmount;
}
