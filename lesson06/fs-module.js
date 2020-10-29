let fs = require('fs')
fs.readFile('./fs-module.js', processFile)
console.log('All asynchronous operations started.')

function processFile(err, data) {
  if(err) {
    return console.error(err)  
  }
  console.log('file content:\n', data.toString())
}



