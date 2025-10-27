'use strict'

function toRomanian(romanian) {
    try {
        if(typeof romanian !== 'string' || romanian.trim() === '') {
            throw new Error('please enter correct romanian string');
        }

        let romanianArr = Array.from(romanian.toUpperCase().trim());
        if (!romanianArr.every(c => ['I', 'V', 'X', 'L', 'C', 'D', 'M'].includes(c))) {
            throw new Error('please enter correct romanian numerics');
        }

        if(romanianArr.length === 1) {
            return romanianToNumber(romanianArr[0]);
        }

        let sum = 0;

        for (let i = 0; i < romanianArr.length; i++) {
            let firstElement = romanianToNumber(romanianArr[i]);
            let secondElement = romanianToNumber(romanianArr[i + 1]);
            let thirdElement = romanianToNumber(romanianArr[i + 2]);
            let fourthElement = romanianToNumber(romanianArr[i + 3]);

            if(firstElement === secondElement && firstElement === thirdElement && firstElement === fourthElement) {
                throw new Error('you can not repeat the same char more than 3 times in a row')
            }

            if (
                (romanianArr[i] === 'V' && romanianArr[i + 1] === 'V') ||
                (romanianArr[i] === 'L' && romanianArr[i + 1] === 'L') ||
                (romanianArr[i] === 'D' && romanianArr[i + 1] === 'D')
            ) {
                throw new Error('V, L, and D cannot be repeated twice in a row');
            }

            if(firstElement <= secondElement && secondElement < thirdElement) {
                throw new Error('only one smaller char can be used before the larger one')
            }

            if(firstElement < secondElement && firstElement === thirdElement) {
                throw new Error('cannot repeat the same char in subtraction');
            }

            if(firstElement < secondElement) {
                if(
                    firstElement === 1 && [50, 100, 500, 1000].includes(secondElement)
                ) {
                    throw new Error('"I" char can not be before the chars of the "L, C, D, M" ')
                }

                if(
                    firstElement === 5 && [10 ,50, 100, 500, 1000].includes(secondElement)
                ) {
                    throw new Error('"V" char can not be before the chars of the "X, L, C, D, M" ')
                }

                if(
                    firstElement === 10 && [500, 1000].includes(secondElement)
                ) {
                    throw new Error('"X" char can not be before the chars of the "V, D, M" ')
                }

                if(
                    firstElement === 100 && [1, 5, 10, 50].includes(secondElement)
                ) {
                    throw new Error('"C" char can not be before the chars of the "I, V, X, L" ')
                }
            }

            if(secondElement > firstElement) {
                sum -= firstElement;
            }else {
                sum += firstElement;
            }
        }

        return sum;
    }catch (err) {
        return err.message;
    }
}

function romanianToNumber(letter) {
    switch(letter) {
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default: return 0;
    }
}
