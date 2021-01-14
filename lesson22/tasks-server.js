const PORT = 1904

const path = require('path')
const express = require('express')
const sitemap = require('express-sitemap-html')

const tasksDb = require('./tasks-db')()
const tasksServices = require('./tasks-services')(tasksDb)
const tasksApiRouter = require('./tasks-web-api')(tasksServices)
const tasksSiteRouter = require('./tasks-web-site')(tasksServices)

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/api', apiCheck)
app.use('/api', tasksApiRouter)
app.use('/site', tasksSiteRouter)


sitemap.swagger('Tasks Api', app)

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

