const PORT = 1904

const express = require('express')
const tasks = require('./tasks')

const app = express()


app.get('/api', apiCheck)
app.get('/api/tasks', tasks.getAllTasks)
app.get('/api/tasks/:id', tasks.getTask)
app.delete('/api/tasks/:id', tasks.deleteTask)
app.put('/api/tasks/:id', tasks.updateTask)
app.post('/api/tasks', tasks.createTask)

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

