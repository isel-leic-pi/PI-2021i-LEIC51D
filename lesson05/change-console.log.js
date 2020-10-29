console.log("SLB")



{
  let oldConsoleLog = console.log

  console.log = function (...args) {
    oldConsoleLog.apply(console, [new Date().toLocaleString()].concat(args))
  }
}

console.log("SLB")