var express = require('express');
var router = express.Router();

router.all('/', function(req, res) {
    var cart = req.params.cart;
    console.log(cart);
    res.render('cart', {items: [], total: 0})
});

module.exports = router;