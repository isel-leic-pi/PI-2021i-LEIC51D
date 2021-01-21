const express = require("express")

module.exports = function (tasksServices) {
  if (!tasksServices) {
    throw "Invalid TasksServices object"
  }

  const router = express.Router()

  router.get("/tasks", getAllTasks)
  router.get("/tasks/new-task", createTaskForm)
  router.get("/tasks/:id", getTask)
  router.delete("/tasks/:id", deleteTask)
  router.put("/tasks/:id", updateTask)
  router.post("/tasks", createTask)

  return router

  function getAllTasks(req, rsp) {
    tasksServices.getAllTasks((tasks) => rsp.render('tasks', { username: req.user.username, title : "ALl tasks", tasks: tasks}))
  }

  function getTask(req, rsp) {
    tasksServices.getTask(req.params.id, processGetTask)
    function processGetTask(err, task) {
      if (err) {
        sendNotFound(req, rsp)
      }

      rsp.json(task)
    }
  }

  function deleteTask(req, rsp) {
    const id = req.params.id

    tasksServices.getTask(req.params.id, processDeleteTask)

    function processDeleteTask(err, task) {
      if (err) {
        sendNotFound(req, rsp)
      }
      sendChangeSuccess(req, rsp, id, "deleted")
    }
  }

  function updateTask(req, rsp) {
    const id = req.params.id
    const task = req.body
    task.id = id

    tasksServices.updateTask(task, processUpdateTask)

    function processUpdateTask(err, task) {
      if (err) {
        return sendNotFound(req, rsp)
      }
      sendChangeSuccess(req, rsp, id, "updated")
    }
  }


  function createTaskForm(req, rsp) {
    rsp.render('new-task', {title: "Create a new task"})
  }

  function createTask(req, rsp) {
    const task = req.body
    console.log("#######", task)
    tasksServices.createTask(task, processCreateTask)
    
    function processCreateTask(err, task) {
      console.log("##", task)
      if (err) {
        return sendNotFound(req, rsp)
      }
      rsp.redirect('/site/tasks')
    }
  }

  function Error(msg, uri) {
    this.error = msg
    this.uri = uri
  }

  function sendNotFound(req, rsp) {
    rsp.status(404).json(new Error("Resource not found", req.originalUrl))
  }

  function sendChangeSuccess(req, rsp, id, changeType, urlSuffix = "") {
    rsp.json({
      status: `task wit id ${id} ${changeType}`,
      uri: req.originalUrl + urlSuffix,
    })
  }
}
