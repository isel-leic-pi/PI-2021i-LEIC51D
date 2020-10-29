
let fs = require('fs')

let files = ['0.txt', '1.txt', '2.txt'] 

files.forEach(readFile)

function readFile(fileName) {
  console.log(`Start reading ${fileName}`)
  fs.readFile('./' + fileName , processFile)

  function processFile(err, data) {
    if(err) {
      return console.error(err)  
    }
    console.log(`File ${fileName} content:\n`, data.toString())
  }
}


console.log('All asynchronous operations started.')

