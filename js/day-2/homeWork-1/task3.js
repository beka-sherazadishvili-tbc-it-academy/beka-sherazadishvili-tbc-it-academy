'use strict'
import { numberValidator, convertStringToNumber } from "./helpers.js"

// day of the week
function getDayOfWeek(dayNumber) {
    dayNumber = convertStringToNumber(dayNumber);

    switch(dayNumber) {
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        case 7: return 'Sunday';
        default: return 'please enter number between 1 and 7'      
    }
}

// Traffic Lights
function getTrafficAction (color) {
    switch (color) {
        case 'red': return 'Stop';
        case 'yellow': return 'Get ready';
        case 'green': return 'Go';
        default: return 'Please enter corect color for traffics'
    }
}

// Calculator
function calculate(num1, num2, operator) {
    num1 = convertStringToNumber(num1);
    num2 = convertStringToNumber(num2);

    if(isNaN(num1) || isNaN(num2)) {
        return 'Please enter an number';
    }

    if(!isFinite(num1) || !isFinite(num2)) {
        return 'please dont enter infinite number'
    }

    switch(operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return (num2 === 0)? 'division by 0 is not allowed': num1 / num2;
        default: return 'please enter correct operator'
    }
}

// Seasons
function getSeason (monthNumber) {
    monthNumber = convertStringToNumber(monthNumber);

    const validationError = numberValidator(monthNumber);
    if(validationError) {
        return validationError;
    }    

    switch (monthNumber) {
        case 12:
        case 1:
        case 2:
            return 'Winter';
        case 3:
        case 4:
        case 5:
            return 'Spring';
        case 6:    
        case 7:    
        case 8:
            return 'Summer'
        case 9:    
        case 10:    
        case 11:
            return 'Automn'
        default: return 'Please enter the number between 1 and 12'    
    }
}
