let tasks = [0,1,2,3,4,5,6,7,8,9]

tasks = tasks.map((dc, i) => { 
  console.log("$$$$")
  return { 
    id: i, 
    name: `task ${i}`,  
    description: `Description of task ${i}`
  }
})


module.exports = {
  getAllTasks: getAllTasks,
  getTask: getTask,
  deleteTask: deleteTask,
  updateTask: updateTask,
  createTask: createTask
}

function getAllTasks(req, rsp) {
    rsp.json(tasks)
}

function getTask(req, rsp) {
  const id = req.params.id
  const task = tasks.find(t => t.id == id)
  if(task) {
    return rsp.json(task)
  }
  rsp.status(404).json(new Error("Resource not found", req.originalUrl))
}

function deleteTask(req, rsp) {
  rsp.end("deleteTask")
}

function updateTask(req, rsp) {
  rsp.end("updateTask")
}

function createTask(req, rsp) {
  rsp.end("createTask")
}


function Error(msg, uri) {
  this.error = msg
  this.uri = uri
}