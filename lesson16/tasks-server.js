const PORT = 1904

const express = require('express')

const tasksDb = require('./tasks-db')()
const tasksServices = require('./tasks-services')(tasksDb)
const tasksApi = require('./tasks-web-api')(tasksServices)

const app = express()

app.use(express.json())


app.get('/api', apiCheck)
app.get('/api/tasks', tasksApi.getAllTasks)
app.get('/api/tasks/:id', tasksApi.getTask)
app.delete('/api/tasks/:id', tasksApi.deleteTask)
app.put('/api/tasks/:id', tasksApi.updateTask)
app.post('/api/tasks', tasksApi.createTask)

app.listen(PORT, () => {
  console.log(`Tasks app listening at http://localhost:${PORT}`)
})


function apiCheck(req, rsp) {
  console.log(req.path)
  rsp
    .status(200)
    .json({
    "name": "tasks api",
    "version": "1.0.0",
    "description": "PI Tasks API running"
    })
}

