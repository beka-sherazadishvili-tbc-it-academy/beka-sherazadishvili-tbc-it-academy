function divide(a, b) {
    a = Number(a);
    b = Number(b);

    try {
        if(isNaN(a) || isNaN(b)) {
            throw new Error('Only numbers are allowed');
        }

        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }

        return a / b;
    } catch (err) {
        return err.message;
    }
}

console.log(divide('string', 5));
