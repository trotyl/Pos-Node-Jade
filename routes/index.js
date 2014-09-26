var express = require('express');
var router = express.Router();
var fixtures = require('../models/fixtures');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '首页' , active: {home: true}});
});

router.get('/list', function(req, res) {
    res.render('list', { title: '商品列表' , active: {list: true}, list: fixtures.loadAllItems()});
});

router.post('/list', function (req, res) {
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

router.get('/cart', function(req, res) {
    res.render('cart', { title: '购物车' , active: {cart: true}, list: [], total: 0});
});

router.get('/payment', function(req, res) {
    res.render('payment', { title: '付款页' , active: {}});
});

module.exports = router;
