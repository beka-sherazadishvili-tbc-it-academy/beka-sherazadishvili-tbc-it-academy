'use strict'

function groupBy(arr, property) {
    try {
        if (!Array.isArray(arr)) {
            throw new Error('please enter an array');
        }

        return arr.reduce((acc, obj) => {
            if (obj[property] === undefined || obj[property] === null) {
                return acc;
            }

            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push();
            return acc;
    }, {});
    } catch (err) {
        return err.message;
    }
}

const students = [
  { name: "Ana", grade: "A" },
  { name: "Beka", grade: "B" },
  { name: "Luka", grade: "A" }
];

const result = groupBy(students, "grade");
console.log(result);
