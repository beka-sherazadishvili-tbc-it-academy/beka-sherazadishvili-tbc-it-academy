"use strict";

function sumAll(...numbers) {
  try {
    const newNumbers = numbers
      .map((num) => Number(num))
      .filter((num) => !isNaN(num) && Number.isFinite(num));

    const hasInvalid = newNumbers.some(
      (num) => isNaN(num) || !Number.isFinite(num)
    );

    if (hasInvalid) {
      throw new Error("there should only be number values");
    }

    return newNumbers.reduce((acc, num) => acc + num, 0);
  } catch (err) {
    return err.message;
  }
}
