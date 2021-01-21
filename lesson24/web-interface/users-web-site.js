const express = require("express");

module.exports = function (tasksServices) {
  if (!tasksServices) {
    throw "Invalid TasksServices object";
  }

  const router = express.Router();

  router.get("/login", loginGet);
  router.post("/login", loginPost);
  router.get("/logout", logout);

  return router

  function loginGet(req, rsp) {
    rsp.render('login')
  }

  function loginPost(req, rsp) {
    const credentials = req.body
    
    tasksServices.verifyLoginCredentials(credentials, processVerifyLogin)

    function processVerifyLogin(err, status) {
      if(status.validCredentials) {
        req.login({ username: credentials.email }, (err) => rsp.redirect('/site/tasks'))
      } else {
        rsp.render('login', {warning: status.error, username: credentials.email})
      }
    }
  }

  function logout(req, rsp) {
    req.logout()
    rsp.redirect('/users/login')
  }
}
