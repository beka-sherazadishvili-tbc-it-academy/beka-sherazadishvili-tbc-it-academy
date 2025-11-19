function validationQuestion(rl, question, validator) {
  return new Promise((resolve) => {
    const ask = () => {
      rl.question(question, (answer) => {
        try {
          const result = validator(answer);
          if (result === false) {
            console.log('Invalid input. Please try again.');
            ask();
          } else {
            resolve(answer);
          }
        } catch (error) {
          console.log(`Error: ${error.message}`);
          ask();
        }
      });
    };
    ask();
  });
}

export { validationQuestion }