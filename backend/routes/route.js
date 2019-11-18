const router = require('express').Router();

router.get('/', async (req, res) => {
  console.log(req);
});

module.exports = router;
