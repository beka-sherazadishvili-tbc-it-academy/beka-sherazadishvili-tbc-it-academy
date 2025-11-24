import { Interface as ReadlineInterface } from "readline";

export function validationQuestion(
  rl: ReadlineInterface,
  question: string,
  validator: (input: string) => boolean
): Promise<string> {
  return new Promise((resolve) => {
    const ask = () => {
      rl.question(question, (answer) => {
        try {
          const result = validator(answer);
          if (result === false) {
            console.log("Invalid input. Please try again.");
            ask();
          } else {
            resolve(answer);
          }
        } catch (error: any) {
          console.log(`${error.message}`);
          ask();
        }
      });
    };
    ask();
  });
}