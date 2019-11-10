var fs = require('fs');
var request = require('request');
var macaroon = fs.readFileSync('./data/chain/bitcoin/simnet/admin.macaroon').toString('hex');

var options = {
  url: 'https://127.0.0.1:8001/v1/getinfo',
  // Work-around for self-signed certificates.
  rejectUnauthorized: false,
  json: true,
  headers: {
    'Grpc-Metadata-macaroon': macaroon
  }
};

request.get(options, function(error, response, body) {
  console.log(body);
});
