const url = process.argv[2] || "https://api.boardgameatlas.com/api/search?name=Catan&client_id=yOdrh2l0zT"



const http = require('urllib')

//https://api.boardgameatlas.com/api/search?name=Catan&client_id=yOdrh2l0zT

const req = http.request(url, processResponse)


function processResponse(err, data , res) {
  if(err) {
    return console.log(err)
  }
  console.log(`Status code: ${res.statusCode}`)
  console.log(`Headers:`, res.headers)

  console.log("Response Body: ", data.toString())
}