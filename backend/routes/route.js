const router = require('express').Router();
const rpc = require('../testRPC');

router.get('/getInfo', async (req, res) => {
  var info = await rpc.getInfo();
  res.json({
    info
  });
});

router.get('/walletBalance', async (req, res) => {
  var balance = await rpc.walletBalance();
  balance.confirmed_balance = BigInt(balance.confirmed_balance).toString();
  balance.total_balance = BigInt(balance.total_balance).toString();
  res.json({
    balance
  });
});

router.get('/listPeers', async (req, res) => {
  var listPeers = await rpc.listPeers();
  res.json({
    listPeers
  });
});

router.post('/connectPeer', async (req, res) => {
  var connectPeer = await rpc.connectPeer(req.body.pub_key);
  res.json({
    connectPeer
  });
});

router.post('/disconnectPeer', async (req, res) => {
  var disconnectPeer = await rpc.disconnectPeer(req.body.pub_key);
  res.json(disconnectPeer);
});

router.post('/', async (req, res) => {
  res.json({
    hello: 'hello' + req.body.hello
  });
});

module.exports = router;
