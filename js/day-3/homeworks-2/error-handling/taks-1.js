function divide(a, b) {
    a = Number(a);
    b = Number(b);

    try {
        if(typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Only numbers are allowed');
        }

        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
    } catch (err) {
        return err.message;
    }
}
