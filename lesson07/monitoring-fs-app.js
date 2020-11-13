//const MODULE_NAME  = './fswatch-pi'
const MODULE_NAME  = './fswatch-pi-node-events'

const fspi = require(MODULE_NAME)

console.log("------------")

const fspi1 = require(MODULE_NAME)


console.log(process.argv)

let path = process.argv[2] || '.'


fspi.watch(path)
fspi1.watch(path)

fspi.on('fs-change', processFsNotification)
fspi1.on('fs-change', processFsNotification)

// fspi.watch(path, processFsNotification)
// fspi1.watch(path, processFsNotification)

function processFsNotification(err, notification) {
  console.log(`## Event ${notification.event} on file ${notification.fileName}, occurred  at ${notification.time}`)

}




