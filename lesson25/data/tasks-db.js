module.exports = function(tasks) {
  tasks = tasks || createInitialTasks()
  
  let maxId = Object.getOwnPropertyNames(tasks).flatMap(name => tasks[name]).reduce((max, curr) => curr.id > max ? curr.id : max, 0)
  console.log(`maxId:`, maxId)

  return {
    getAllTasks: getAllTasks,
    getTask: getTask,
    createTask: createTask,
    deleteTask: deleteTask,
    updateTask: updateTask
  }


  function createInitialTasks() {
    return require('./initial-tasks.json')
  }
  

  function getAllTasks(username, cb) { 
    cb(tasks[username])
  }

  function getTask(username, id, cb) { 
    const task = tasks.find(t => t.id == id)
    task ? cb(null,task) : cb('Task not found')
  }

  function createTask(username, task, cb) { 
    task.id = ++maxId
    tasks.push(task)
    cb(null, task)

  }

  function deleteTask(username, id, cb) { 
    let newTasks = tasks.filter(t => t.id != id)
    
    let result = null
    if(newTasks.length != tasks.length) {
      tasks = newTasks
    } else {
      result = `Task with id ${id} not found`
    }

    cb(result)
  }


  function updateTask(username, newTask, cb) { 
    const task = tasks.find(t => t.id == newTask.id)
      if(task) {
        task.name = newTask.name
        task.description = newTask.description
        cb(null)
      } else {
        cb('task not found')
      }
  }



}