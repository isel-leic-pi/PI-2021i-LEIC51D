
let f = function(p) {
  let f1 = function (p1) {
    console.log(p)
    p = p1
   }
  return f1;
}

let f2 = f(2)
f2()
f2(10)
f2()


let f3 = f(3);
f3();
f2()

console.log("-------------------")

function f4(n) {
  let af = [];

  for(let i = 0; i < n; ++i) {
    af[i] = function () {
      console.log(i)
    }
  }
  return af
}


let arrFuncs = f4(4);

for(let i = 0; i < arrFuncs.length; ++i) {
  arrFuncs[i]()
}

let f5 = arrFuncs[0]
f5()

// Now closure created on f4 first iteration is not accessible anymore, therefore can be garbage collected
arrFuncs[0] = f5 = null


