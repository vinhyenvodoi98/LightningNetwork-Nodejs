require('dotenv').config();
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./rpc.proto', {
  keepCase: true
});
const lnrpc = grpc.loadPackageDefinition(packageDefinition).lnrpc;

process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';
var lndCert = Buffer.from(process.env.LND_CERT, 'utf8');
var sslCreds = grpc.credentials.createSsl(lndCert);

var macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(
  args,
  callback
) {
  var macaroon = process.env.LND_MACAROON;
  var metadata = new grpc.Metadata();
  metadata.add('macaroon', macaroon);
  callback(null, metadata);
});

var creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
var lightning = new lnrpc.Lightning('localhost:10009', creds);

var getInfo = () => {
  var request = {};
  lightning.getInfo(request, function(err, response) {
    console.log(response);
  });
};

var newAddress = () => {
  var request = {
    type: ''
  };
  lightning.newAddress(request, function(err, response) {
    console.log(response);
  });
};

var walletBalance = () => {
  request = {};
  lightning.walletBalance(request, function(err, response) {
    console.log(response);
  });
};

var connectPeer = () => {
  var request = {
    //this is addr test

    addr: {
      pubkey:
        '03c5a180fe2d2805dc82065ba4656613c32b4adfb4200bdb52d01a593b3ff080ae',
      host: 'localhost:10012'
    },
    perm: true
  };
  lightning.connectPeer(request, function(err, response) {
    console.log(response);
  });
};

var listPeers = () => {
  var request = {};
  lightning.listPeers(request, function(err, response) {
    console.log(response);
  });
};

var openChannel = () => {
  // this is pubkey test
  var pubkey =
    '02c9c7b15e75e9c33671fd6c82d8218f5b4dca825c7d831c77902b941330da04c9';
  var request = {
    node_pubkey_string: pubkey,
    local_funding_amount: 5000000,
    push_sat: 0,
    target_conf: 1,
    private: false,
    min_confs: 3,
    spend_unconfirmed: false
  };
  lightning.openChannelSync(request, function(err, response) {
    console.log(response);
  });
};

var channelBalance = () => {
  var request = {};
  lightning.channelBalance(request, function(err, response) {
    console.log(response);
  });
};

var listChannel = () => {
  var request = {
    active_only: true
  };
  lightning.listChannels(request, function(err, response) {
    console.log(response);
  });
};

var addInvoice = () => {
  var request = {
    amt_paid: 10000
  };
  lightning.addInvoice(request, function(err, response) {
    console.log(response);
  });
};

var closeChannel = () => {
  var request = {
    channel_point: {
      funding_txid_str:
        '229e6fbbe4942c1e405fdf50c55174a609440fb39f20e822eec34286aadab098',
      output_index: 0
    }
  };
  var call = lightning.closeChannel(request);
  call.on('data', function(response) {
    console.log(response);
  });
};

var channalBalance = () => {
  var request = {};
  lightning.channelBalance(request, function(err, response) {
    console.log(response);
  });
};
// getInfo();
// walletBalance();
// newAddress();
// listPeers();
// connectPeer();
// listChannel();
// openChannel();
addInvoice();
// channelBalance();
// closeChannel();
