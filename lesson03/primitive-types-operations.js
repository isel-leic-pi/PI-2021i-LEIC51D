let a = "123"
let b = -1

console.log(a-b)
console.log(b+a)

console.log("0" == false)
//console.log(Boolean(null))

//////////////////////


let c = a || b
console.log(c)

let d = a && b
console.log(d)

function f(x) {
  x = x || 1
  console.log(x)
}

f(5)
f()
f(false)
f(0)
f("")

