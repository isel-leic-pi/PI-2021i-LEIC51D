const http = require('http')

const server = http.createServer(processRequest)
server.listen(1904)

function processRequest(req, rsp) {
  console.log(`${req.method}`)
  console.log(req.headers)

  rsp.statusCode = 299
  rsp.setHeader('Content-Type', 'text/plain')
  rsp.end("Hello from server")
}






