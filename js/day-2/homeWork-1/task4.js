'use strict'
import { numberValidator, convertStringToNumber, isPrimeNumber} from "./helpers.js"

//Pattern Printing
function printPattern(rows) {
    rows = convertStringToNumber(rows);

    const validationError = numberValidator(rows);
    if(validationError) {
        return validationError;
    }

    if(rows <= 0) {
        return 'please nter the row greater or equal to 1'
    }
    
    for(let i = 0; i < rows; i++) {
        for(let j = rows - i; j <= rows; j++) {
            process.stdout.write('*');
        }
        console.log();
    }
}

//Prime Numbers in Range
function printPrimesInRange(start, end) {
    const startValidator = numberValidator(start);
    if(startValidator) {
        return startValidator;
    }

    const endValidator = numberValidator(end);
    if(endValidator) {
        return endValidator;
    }

    start = convertStringToNumber(start);
    end = convertStringToNumber(end);
    let primeNumbers = []

    if(start < 2) {
        return 'please enter values greater or equal to 2'
    }

    for (let i = start; i <= end; i++) {
        if(isPrimeNumber(i)) {
            primeNumbers.push(i);
        }
    }

    return primeNumbers;
}

console.log(printPrimesInRange(2, 19));