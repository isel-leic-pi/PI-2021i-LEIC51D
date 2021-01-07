
async function divWithDualAsyncImplementation(a, b, cb) {
  let p = new Promise(promiseExecutor)
  if(!cb) {
    // Return a promise
    return p
  } else {
    // call the callback when the promise is completed 
    p.then(res => cb(null, res)).catch(err => cb(err))
  }
  
  
  function promiseExecutor(successFunc, rejectFunc) {
    if(b == 0) {
      return rejectFunc("0 is an invalida value for divisor")
    }
    setTimeout(() => {
      successFunc(a/b)
    }, 5000) 
  }
}


// Usage with callback
divWithDualAsyncImplementation(9,9, processResult)
divWithDualAsyncImplementation(9,0, processResult)

// Usage with Promise
divWithDualAsyncImplementation(20,10)
  .then(processSuccess)
  .catch(processError)
  .finally(() => console.log("finally with success"))
divWithDualAsyncImplementation(20,0)
  .then(processSuccess)
  .catch(processError)
  .finally(() => console.log("finally with error"))
  ;

// Usage with async/await
(async function () {
  try {
    // Version 1: Without Promise.all each asynchronous operations starts when the previous ends 
    // let res1 = await divWithDualAsyncImplementation(30,10)
    // let res2 = await divWithDualAsyncImplementation(40,10)
    // let res3 = await divWithDualAsyncImplementation(50,10)
    // let res = [res1, res2, res3]

    // Version 2: With Promise.all each asynchronous operations starts "at the same time"
    let res1 = divWithDualAsyncImplementation(30,10)
    let res2 = divWithDualAsyncImplementation(40,10)
    let res3 = divWithDualAsyncImplementation(50,10)
    let res = await Promise.all([res1, res2, res3])
    
    processSuccess(res)
  } catch(err) {
    processError(err)
  } 
})()


function processResult(err, res) {
  err ? processError(err) : processSuccess(res)
}

function processSuccess(res) {
  console.log("Success:", res)
}

function processError(err) {
  console.log("Error:", err)
}


