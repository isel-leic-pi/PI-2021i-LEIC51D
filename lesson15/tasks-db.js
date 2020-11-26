module.exports = {
  getAllTasks: getAllTasks,
  getTask: getTask,
  createTask: createTask,
  deleteTask: deleteTask,
  updateTask: updateTask
}



let tasks = [0,1,2,3,4,5,6,7,8,9]

tasks = tasks.map((dc, i) => { 
  return { 
    id: i, 
    name: `task ${i}`,  
    description: `Description of task ${i}`
  }
})

let maxId = tasks.length


function getAllTasks(cb) { 
  cb(tasks)
}

function getTask(id, cb) { 
  const task = tasks.find(t => t.id == id)
  task ? cb(null,task) : cb('Task not found')
}

function createTask(task, cb) { 

}

function deleteTask(idTask, cb) { 
  let newTasks = tasks.filter(t => t.id != id)

  if(newTasks.length != tasks.length) {
    tasks = newTasks
    return sendChangeSuccess(req, rsp, id, "deleted")
  }

}


function updateTask(newTask, cb) { 
  const task = tasks.find(t => t.id == newTask.id)
    if(task) {
      task.name = newTask.name
      task.description = newTask.description
      cb(null)
    } else {
      cb('task not found')
    }
}



