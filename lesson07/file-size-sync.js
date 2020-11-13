const fs = require('fs')
const stat = fs.statSync('./0.txt')
processFile(stat)


function processFile(stat) {
  console.log(`File size is ${stat.size}\n`)
}

console.log('All synchronous operations completed.')






