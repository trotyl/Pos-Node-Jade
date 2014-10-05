var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var Order = require('../models/order');
var Storage = require('../models/storage');
var fixtures = require('../models/fixtures');
var _ = require('lodash');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/cart_counter', function (req, res) {
    Order.all(function (err, list) {
        if (err) {
            console.log(err);
        }
        var cartStats = Order.getCartStats(list);
        res.json(cartStats.count);
    });
});

router.post('/add_item', function (req, res) {
    var name = req.body.name;
    Order.getItem(name, function (err, result) {
        if (err) {
            console.log(err);
            res.end();
        }
        if (result) {
            result.addCount();
            result.store(function () { res.send(true); });
        }
        else {
            result = _(fixtures.loadAllItems()).find({name: name});
            result.addCount();
            result.getPromotion(fixtures.loadPromotions());
            result.join(function () { res.send(true); });
        }

    });
});

router.post('/change_count', function (req, res) {
    var name = req.body.name;
    var count = req.body.count;
    Order.getItem(name, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        if (result) {
            result.count = parseInt(count);
            result.store(function () { res.send(result.sumDisplay()); });
        }
    });
});

router.post('/clear', function (req, res) {
    Order.clear(function (err) {
        if (err) {
            console.log(err);
            res.end();
        }
        res.send(true);
    });
});

router.post('/alter_count', function (req, res) {
    var name = req.body.name;
    var count = req.body.count;
    Storage.getItem(name, function (err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        if(result) {
            result.count = parseInt(count);
            result.store(function () { res.send(true); });
        }
    })
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
