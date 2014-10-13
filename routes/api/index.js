var express = require('express');
var router = express.Router();
var cart = require('./cart');
var item = require('./item');

router.use('/cart', cart);
router.use('/item', item);

router.all('/', function(req, res) {
    res.send('this is the api router.');
});

module.exports = router;
