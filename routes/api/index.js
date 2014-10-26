var express = require('express');
var router = express.Router();

var item = require('./item');
var pos = require('./pos');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.use('/item', item);
router.use('/pos', pos);

module.exports = router;
