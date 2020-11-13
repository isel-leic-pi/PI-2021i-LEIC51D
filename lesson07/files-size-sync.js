const fs = require('fs')
const DIR = '.'

try {
  const files = fs.readdirSync(DIR)
  processFiles(null, files)
} catch(err) {
  processFiles(err)
}



function processFiles(err, files) {
  if(err) {
    return console.log(err)
  }
  
  const size = files.reduce(processFile, 0)
  showSize(size)

  
  function processFile(acc, fileName) {
    console.log(fileName)
    return acc + fs.statSync(fileName).size
  }
  
  function showSize(size) {
    console.log(`All files in directory ${DIR} is ${size}`)
  }
}

console.log('All synchronous operations completed.')






