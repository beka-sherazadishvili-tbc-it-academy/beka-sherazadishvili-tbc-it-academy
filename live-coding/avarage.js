// Add an `average` method to the every array that calculates the average (mean) of all numeric elements in the array.

// **Requirements:**
// - Ignore non-numeric values
// - Handle empty arrays (return 0 or NaN)
// - Work with negative numbers
// - Work with decimal numbers

function average(arr) {
    try {
        if(!Array.isArray(arr)) {
            throw new Error('please enter arr value')
        }

        if(arr.length === 0) {
            return 0;
        }

        const newArr = arr.map(number => Number(number)).filter(number => !isNaN(number) || number === null);
        console.log(newArr)

        return newArr.reduce((acc, sum) => acc + sum, 0) / newArr.length;
    } catch (err) {
        return err.message;
    }
}
