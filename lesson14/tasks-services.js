

module.exports = function(tasksDb) {
  if(!tasksDb) {
    throw "Invalid TasksDb object"
  }

  return {
    getAllTasks: getAllTasks,
    getTask: getTask,
    createTask: createTask,
    deleteTask: deleteTask,
    updateTask: updateTask
  }

  function getAllTasks(cb) { 
    tasksDb.getAllTasks(cb)
  }

  function getTask(idTask, cb) { 
    tasksDb.getTask(idTask, cb)
  }

  function createTask(task, cb) { 
    if(!task.name) {
      return cb('Name is required')
    }
    tasksDb.createTask(idTask, cb)
  }

  function deleteTask(idTask, cb) { 
    tasksDb.deleteTask(idTask, cb)
  }


  function updateTask(task, cb) { 
    tasksDb.getTask(task.id, processTask)

    function processTask(taskDb) {
      tasksDb.name = task.name
      tasksDb.description = task.description
      
      tasksDb.updateTask(tasksDb, cb)
    }
  }

}

