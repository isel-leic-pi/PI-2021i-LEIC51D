const http = require('https')

//https://api.boardgameatlas.com/api/search?name=Catan&client_id=yOdrh2l0zT
const options = {
  method: 'GET',
  host: 'api.boardgameatlas.com',
  path: '/api/search?name=Catan&client_id=yOdrh2l0zT'
}

const req = http.request(options, processResponse)


req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end()


function processResponse(res) {
  console.log(`Status code: ${res.statusCode}`)
  console.log(`Headers:`, res.headers)


  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
}