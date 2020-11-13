const fs = require('fs')
fs.stat('./0.txt', processFile)

function processFile(err, stat) {
  console.log(`File size is ${stat.size}\n`)
}

console.log('All asynchronous operations started.')






