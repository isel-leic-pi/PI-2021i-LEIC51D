const fs = require('fs')

console.log("Global module code begin")
// Replacing the already existing object
// module.exports = {
//   watch: watch
// }

// or

// Adding properties to the already existing object
module.exports.watch = watch


function watch(path, cb) {
  fs.watch(
    path, 
    { persistent: true, recursive: true, encoding: 'utf8'}, 
    processFsEvent
  )
  
  function processFsEvent(event, file) {
    cb(null, { event: event, fileName: file, time: new Date().toLocaleString()}) 
  }
}

console.log("Global module code end")

