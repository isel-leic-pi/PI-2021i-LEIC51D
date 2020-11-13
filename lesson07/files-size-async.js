const fs = require('fs')

const DIR = process.argv[2] || '.'

console.log(`Directory to show the files size is ${DIR}`)

fs.readdir(DIR, processFiles)

function processFiles(err, files) {
  console.log(files)
  if(err) {
    return console.log(err)
  }

  let acc = 0
  let numFiles = files.length
  
  files.forEach(processFile)

  function processFile(fileName) {
    fs.stat(DIR + fileName, processStats)

    function processStats(err, stats) {
      if(err) {
        return console.log("####" + err)

      }
      acc += stats.size
      if(--numFiles == 0) {
        showSize(acc)
      }
    }
  }

  function showSize(size) {
    console.log(`All files in directory ${DIR} is ${size}`)
  }
}

console.log('All asynchronous operations started.')






