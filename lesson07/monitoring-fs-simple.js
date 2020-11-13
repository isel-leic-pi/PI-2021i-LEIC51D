const fs = require('fs')

console.log(process.argv)

let path = process.argv[2] || '.'

fs.watch(
  path, 
  { persistent: true, recursive: true, encoding: 'utf8'}, 
  processFsEvent
)

function processFsEvent(event, file) {
  console.log(`event ${event} on file ${file}, occurred  at ${new Date().toLocaleString()}`)
}


