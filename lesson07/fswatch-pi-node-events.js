const fs = require('fs')
const EventEmitter = require('events')


console.log("Global module code begin")

//--------------------

// const emitter = module.exports = new EventEmitter()
// emitter.watch = watch

// or 
// function MyEmitter() {
//   this.watch = watch
// }
// MyEmitter.prototype = new EventEmitter()

// or

class MyEmitter extends EventEmitter {
  watch = watch
}

const emitter = module.exports = new MyEmitter()


//--------------------

function watch(path) {
  fs.watch(
    path, 
    { persistent: true, recursive: true, encoding: 'utf8'}, 
    processFsEvent
  )
  
  function processFsEvent(event, file) {

    emitter.emit('fs-change', null, { event: event, fileName: file, time: new Date().toLocaleString()})
  }
}

console.log("Global module code end")

