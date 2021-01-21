

module.exports = function(tasksDb, usersDb) {
  if(!tasksDb) {
    throw "Invalid TasksDb object"
  }

  return {
    getAllTasks: getAllTasks,
    getTask: getTask,
    createTask: createTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
    verifyLoginCredentials: verifyLoginCredentials

  }

  function getAllTasks(username, cb) { 
    tasksDb.getAllTasks(username, cb)
  }

  function getTask(username, idTask, cb) { 
    tasksDb.getTask(username, idTask, cb)
  }

  function createTask(username, task, cb) { 
    if(!task.name) {
      return cb('Name is required')
    }
    tasksDb.createTask(task, cb)
  }

  function deleteTask(username, idTask, cb) { 
    tasksDb.deleteTask(idTask, cb)
  }


  function updateTask(username, task, cb) { 
    tasksDb.getTask(task.id, processTask)

    function processTask(taskDb) {
      tasksDb.name = task.name
      tasksDb.description = task.description
      
      tasksDb.updateTask(tasksDb, cb)
    }
  }

  function verifyLoginCredentials(credentials, cb) {    
    usersDb.getUser(credentials.email, processGetUser)
    
    function processGetUser(err, user) {
      if(err) 
        return cb(err)
      let statusData = !user || credentials.password != user.password 
        ? { validCredentials: false, error: 'Invalid username or password' } 
        : { validCredentials: true }

      cb(null, statusData)
    }
  }
}

