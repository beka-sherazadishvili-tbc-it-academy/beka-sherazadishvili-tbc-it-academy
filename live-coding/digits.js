// ## 1.2

// You are given two non-negative integers, represented as arrays of digits.

// Each array contains digits. lowest digit first.
// Return the product of the two numbers, also as an array of digits, in the same order.

// You cannot convert the arrays into numbers directly.

// num1 = [3, 2, 1]
// num2 = [5, 4]

// [5, 5, 3, 5]

function multiplyDigits(num1, num2) {
    const number1 = 0;
    const reminer = 0;
    for (let i = 0; i < num2.length; i++) {
        for (let j = 0; j < num1.length; j++) {
            let multiply = num1[j] * num2[j];
            if(multiply > 9) {
                const arr = String(multiply).split('');
                reminer = Number(arr[0]);
                number1 += Number(1);
            }

            number1 += multiply;
        } 
    }
}

multiplyDigits([3, 2, 1], [5,4])

