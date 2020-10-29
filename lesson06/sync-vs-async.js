function mul(a, b) {
  return a*b
}

let res = mul(2,3)

console.log(1)
console.log(res)

console.log('------------')


function mulAsyncWithSyncImplementation(a, b, cb) {
  cb(a*b);
}

console.log(2)
mulAsyncWithSyncImplementation(2,3, res => console.log(res))
console.log(3)
mulAsyncWithSyncImplementation(3,4, res => console.log(res))
console.log(4)

console.log('------------')

function mulAsyncWithAsyncImplementation(a, b, cb) {
  let wait = getRandomNumber(2000)
  console.log(`waiting: ${wait} ms`)
  setTimeout(() => {
    cb(a*b)  
  }, wait)
}

console.log(5)
mulAsyncWithAsyncImplementation(5,4, res => console.log(res))
console.log(6)
mulAsyncWithAsyncImplementation(6,7, res => console.log(res))
console.log(7)


function getRandomNumber(max) {
  return Math.floor(Math.random() * max)
}

