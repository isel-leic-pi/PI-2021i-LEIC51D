const PORT = 1904

const path = require('path')
const express = require('express')
const morgan = require('morgan') 
const sitemap = require('express-sitemap-html')
const cookieParser = require('cookie-parser') 
const passport = require('passport') 
const expressSession = require('express-session');

const tasksDb = require('./data/tasks-db')()
const usersDb = require('./data/users-db')()
const tasksServices = require('./application-logic/tasks-services')(tasksDb, usersDb)
const tasksApiRouter = require('./web-interface/tasks-web-api')(tasksServices)
const tasksSiteRouter = require('./web-interface/tasks-web-site')(tasksServices)
const usersSiteRouter = require('./web-interface/users-web-site')(tasksServices)

const app = express()

app.use(expressSession({secret: "Será que é este ano o 38?"}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'web-interface', 'public')));


app.set('views', path.join(__dirname, 'web-interface', 'views'));
app.set('view engine', 'hbs');

app.get('/api', apiCheck)
app.use('/api', tasksApiRouter)
app.use('/site', verifyAuthenticated, tasksSiteRouter)
app.use('/users', usersSiteRouter)


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

function serializeUser(user, done) {
  console.log("serializeUserCalled")
  console.log(user)
  done(null, {username: user.username})
}

function deserializeUser(user, done) {
  console.log("deserializeUserCalled")
  console.log(user)
  done(null, user)
}

function verifyAuthenticated(req, rsp, next) {
  if(req.user) {
    return next()
  }
  rsp.redirect(302, '/users/login')
  // rsp.status(302).set('Location', '/site/public/login').end()
  // rsp.status(302).location('/site/public/login').end()
}

