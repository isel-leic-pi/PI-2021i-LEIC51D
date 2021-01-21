const express = require("express");

module.exports = function (tasksServices) {
  if (!tasksServices) {
    throw "Invalid TasksServices object";
  }

  const router = express.Router();

  router.get("/tasks", getAllTasks);
  router.get("/tasks/:id", getTask);
  router.delete("/tasks/:id", deleteTask);
  router.put("/tasks/:id", updateTask);
  router.post("/tasks", createTask);

  return router

  function getAllTasks(req, rsp) {
    tasksServices.getAllTasks((tasks) => rsp.json(tasks));
  }

  function getTask(req, rsp) {
    tasksServices.getTask(req.params.id, processGetTask);
    function processGetTask(err, task) {
      if (err) {
        sendNotFound(req, rsp);
      }

      rsp.json(task);
    }
  }

  function deleteTask(req, rsp) {
    const id = req.params.id;

    tasksServices.getTask(req.params.id, processDeleteTask);

    function processDeleteTask(err, task) {
      if (err) {
        sendNotFound(req, rsp);
      }
      sendChangeSuccess(req, rsp, id, "deleted");
    }
  }

  function updateTask(req, rsp) {
    const id = req.params.id;
    const task = req.body;
    task.id = id;

    tasksServices.updateTask(task, processUpdateTask);

    function processUpdateTask(err, task) {
      if (err) {
        return sendNotFound(req, rsp);
      }
      sendChangeSuccess(req, rsp, id, "updated");
    }
  }

  function createTask(req, rsp) {
    const task = { name: req.body.name, description: req.body.description };
    const id = (task.id = ++maxId);
    //tasks.id = tasks.map(t => t.id).sort().pop()+1 // Just for fun, but extremely inefficient!!!

    tasks.push(task);
    return sendChangeSuccess(req, rsp, id, "created", `/${id}`);
  }

  function Error(msg, uri) {
    this.error = msg;
    this.uri = uri;
  }

  function sendNotFound(req, rsp) {
    rsp.status(404).json(new Error("Resource not found", req.originalUrl));
  }

  function sendChangeSuccess(req, rsp, id, changeType, urlSuffix = "") {
    rsp.json({
      status: `task wit id ${id} ${changeType}`,
      uri: req.originalUrl + urlSuffix,
    });
  }
};
