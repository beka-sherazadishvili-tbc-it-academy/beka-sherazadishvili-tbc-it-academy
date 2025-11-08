'use strict';
import { add, subtract, multiply } from './math.js';
import { PI, E } from './constants.js';

const additionResult = add(5, 3);

const multipliedResult = multiply(additionResult, PI);

const finalResult = subtract(multipliedResult, E);

console.log(finalResult);
