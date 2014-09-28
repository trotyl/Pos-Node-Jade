var express = require('express');
var router = express.Router();
var Order = require('../models/order');
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
            //res.send(0);
        }
        var cartStats = Order.getCartStats(list);
        res.json(cartStats.count);
    });
});

router.post('/add_item', function (req, res) {
    var name = req.body.name;
    Order.getItem(name, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            if (result) {
                result.addCount();
                result.store(function (err) {
                    if(err) {
                        res.send(err);
                    }
                    res.send(true);
                });
            }
            else {
                result = _(fixtures.loadAllItems()).find({name: name});
                result.addCount();
                result.getPromotion(fixtures.loadPromotions());
                result.join(function () {
                    res.send(true);
                });
            }
        }
    });
});

router.post('/minus_item', function (req, res) {
    var name = req.body.name;
    Order.getItem(name, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            if (result) {
                result.minusCount();
                result.store(function (err) {
                    if(err) {
                        res.send(err);
                    }
                    res.send(true);
                });
            }
        }
    });
});

router.post('/sum_display', function (req, res) {
    var name = req.body.name;
    Order.getItem(name, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            if (result) {
                res.send(result.sumDisplay());
            }
        }
    });
});

router.post('/clear', function (req, res) {
    Order.clear(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(true);
        }
    });
});

module.exports = router;
