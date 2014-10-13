var express = require('express');
var router = express.Router();
var Item = require('../../models/item');
var Storage = require('../../models/storage');
var _ = require('lodash');
var cart = require('./cart');

router.use('/cart', cart);

/* GET users listing. */
router.all('/', function(req, res) {
    res.send('respond with a resource');
});

router.post('/item/delete', function (req, res) {
    var name = req.body.name;
    Storage.removeItem(name, function (err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        res.send(true);
    })
});

router.post('/item/create', function (req, res) {
    var name = req.body.name;
    var count = req.body.count;
    var price = req.body.price;
    var unit = req.body.unit;
    var attributes = req.body.attributes;
    var item = new Item('', name, unit, price, '', count);
    item.attributes = attributes;
    item.createdAt = new Date();
    Storage.add(item, function () {
        res.send(true);
    });
});

module.exports = router;
