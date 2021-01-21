module.exports = function(users) {
  users = users || require('./initial-users.json')

  return {
    getUser: getUser,
  
  }


  function getUser(username, cb) {
    cb(null, users.find(u => u.username == username))
  }
}


