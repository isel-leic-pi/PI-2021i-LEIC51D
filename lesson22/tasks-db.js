module.exports = function(tasks) {
  tasks = tasks || createInitialTasks()
  
  let maxId = tasks.reduce( (max, curr) => curr.id > max ? curr.id : max)

  return {
    getAllTasks: getAllTasks,
    getTask: getTask,
    createTask: createTask,
    deleteTask: deleteTask,
    updateTask: updateTask
  }


  function createInitialTasks() {
    // let tasks = [0,1,2,3,4,5,6,7,8,9]
    // tasks = tasks.map((dc, i) => { 
    //     return { 
    //       id: i, 
    //       name: `task ${i}`,  
    //       description: `Description of task ${i}`
    //     }
    //   })
    //   return tasks
    return require('./initial-tasks.json')
  }
  

  function getAllTasks(cb) { 
    cb(tasks)
  }

  function getTask(id, cb) { 
    const task = tasks.find(t => t.id == id)
    task ? cb(null,task) : cb('Task not found')
  }

  function createTask(task, cb) { 
    task.id = ++maxId
    tasks.push(task)
    cb(null, task)

  }

  function deleteTask(id, cb) { 
    let newTasks = tasks.filter(t => t.id != id)
    
    let result = null
    if(newTasks.length != tasks.length) {
      tasks = newTasks
    } else {
      result = `Task with id ${id} not found`
    }

    cb(result)
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



}