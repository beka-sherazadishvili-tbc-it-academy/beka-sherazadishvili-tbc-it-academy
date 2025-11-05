'use strict'

// function Dog(name) {
//   this.name = name;
// }

// Dog.prototype.tricks = []; // shared tricks list

// Dog.prototype.learn = function (trick) {
//   this.tricks.push(trick);
// };

// var rex = new Dog("Rex");
// var max = new Dog("Max");

// rex.learn("sit");
// rex.learn("roll");

// console.log(rex.tricks); // ["sit", "roll"]
// console.log(max.tricks); // ["sit", "roll"]  <-- Oops!

/*
PROBLEM:
the problem is that there is created one shared prototype 
which is shared for all the dog instances
*/

//Fix: put tricks to the Dog function so that each oject would see own properties

function Dog(name) {
  this.name = name;
  this.tricks = []
}

Dog.prototype.learn = function (trick) {
  this.tricks.push(trick);
};

var rex = new Dog("Rex");
var max = new Dog("Max");

rex.learn("sit");
rex.learn("roll");

console.log(rex.tricks); // ["sit", "roll"]
console.log(max.tricks); // ["sit", "roll"]  <-- Oops!

