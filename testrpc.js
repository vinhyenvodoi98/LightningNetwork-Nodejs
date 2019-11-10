var fs = require('fs');
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./rpc.proto');
const lnrpc = grpc.loadPackageDefinition(packageDefinition).lnrpc;

process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';
var lndCert = fs.readFileSync('/home/ubuntu/.lnd/tls.cert');
var sslCreds = grpc.credentials.createSsl(lndCert);

var macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(args, callback) {
  var macaroon = fs.readFileSync('./data/chain/bitcoin/simnet/admin.macaroon').toString('hex');
  var metadata = new grpc.Metadata();
  metadata.add('macaroon', macaroon);
  callback(null, metadata);
});

var creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
var lightning = new lnrpc.Lightning('localhost:10001', creds);
var request = {};
lightning.getInfo(request, function(err, response) {
  console.log(response);
});
