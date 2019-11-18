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
  res.json({
    balance
  });
});

router.post('/', async (req, res) => {
  console.log(req.body);
  res.json({
    hello: 'hello' + req.body.hello
  });
});

module.exports = router;
