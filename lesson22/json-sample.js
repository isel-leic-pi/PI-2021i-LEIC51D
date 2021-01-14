


let o = {
  a: 12,
  b: [
    {
      c: "SLB",
      d: function (a, b) { return a+b }
    }
  ]
}



let str = JSON.stringify(o)
console.log(str)

let o1 = JSON.parse(str)
console.log(o1)


let o2 = require('./sample.json')
console.log(o2)
