function mulWithPromisesSyncImplementation(a,b) {
  return Promise.resolve(a*b)
}

function mulWithPromisesAsyncImplementation(a, b) {
  return new Promise(promiseExecutor)
  
  function promiseExecutor(successFunc, rejectFunc) {
    setTimeout(() => {
      successFunc(a*b)
    }, 5000) 
  }
}

console.log("Now with promises")

mulWithPromisesSyncImplementation(9,9)
  .then(res => console.log(res))
  .catch(err => console.log(err))

console.log("after calling mulWithPromisesSyncImplementation")

mulWithPromisesAsyncImplementation(7, 8)
  .then(res => console.log(res))
  .catch(err => console.log(err))
  console.log("after calling mulWithPromisesSyncImplementation")

console.log("main code ended")


