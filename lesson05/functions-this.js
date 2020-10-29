"use strict"

function f() {
  console.log(`this =`, this);
}


function Point(x = 0, y = 0) {
  this.x = x
  this.y = y

  this.add = function (p) {
    return new Point(this.x + p.x, this.y + p.y)
  }

  console.log(this);
}

// Point.prototype.add = function(p) {
//   return new Point(this.x+p.x, this.y+p.y)
// }

// 1st way: As a global function
// this refers to the Global Object
console.log(`1st way: As a global function`)
f();


// 2nd way: As a method
// this refers to the object with the method
console.log(`2nd way: As a method`)
let o = {
  m: f
}

o.m();

// // 3rd way: As a constructor
// // this refers to the newly created object
console.log(`3rd way: As a constructor`)
let p1 = new Point(2, 3)


let p2 = p1.add(p1)

let f2 = p1.add;


// Point(2,3) // Don't call constructor function in a global way. Raises an error in strict mode

//let p3 = f2(p1) // Don't call method as a global function


// 4th way: Using methods call or apply
// this will be the first argument passed to one of this functions
console.log(`4th way: Using methods call or apply`)

let p4 = Point.call(new Object(),2,3) // <=> new Point(2,3)
Point.apply(new Object(),[4,5])       // <=> new Point(4, 5)


// Having some fun with function this'es!!!

// let o = { }
// o = f
// o()

// // This is really nuts... But possible in JavaScript... The purpose of this usage?
// // Who knows... But... it's possible anyway!!!
// o.m = o
// o.m()