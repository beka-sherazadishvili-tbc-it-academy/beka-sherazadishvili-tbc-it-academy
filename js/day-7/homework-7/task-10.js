'use strict'

if (!Function.prototype.once) {
  Object.defineProperty(Function.prototype, 'once', {
    value: function() {
      const fn = this;
      let called = false;
      let result;

      return function(...args) {
        if (!called) {
          called = true;
          result = fn.apply(this, args);
        }
        return result;
      };
    },
    writable: true,
    configurable: true
  });
}

//Example code

// function greet(name) {
//   console.log("Hello, " + name);
//   return "Hi " + name;
// }

// const greetOnce = greet.once();

// console.log(greetOnce("Ana")); // prints "Hello, Ana" then returns "Hi Ana"
// console.log(greetOnce("Luka")); // does NOT print, returns "Hi Ana" again

// // Works with methods and `this`
// const counter = {
//   count: 0,
//   inc() {
//     this.count++;
//     return this.count;
//   },
// };

// const incOnce = counter.inc.once();

// console.log(incOnce.call(counter)); // 1
// console.log(incOnce.call(counter)); // 1 (not executed again)