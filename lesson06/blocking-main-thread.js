console.log("BEGIN")

setTimeout(cb, 3000)

function cb() {
  console.log("Some time after....")
}

console.log("END")

while(true);