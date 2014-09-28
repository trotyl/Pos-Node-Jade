var express = require('express');
var router = express.Router();
var fixtures = require('../models/fixtures');
var Order = require('../models/order');
var _ = require('lodash');

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: '首页' , active: {home: true}});
});

router.get('/list', function(req, res) {
    res.render('list', { title: '商品列表' , active: {list: true}, list: fixtures.loadAllItems()});
});

router.get('/cart', function(req, res) {
    Order.all(function (err, list) {
        if (err) {
            console.log(err);
        }
        var cartStats = Order.getCartStats(list);
        var items = _(list).filter(function (record) {
            return record.count > 0;
        }).value();
        res.render('cart', { title: '购物车' , active: {cart: true}, items: items, total: cartStats.total});
    });
});

router.get('/payment', function(req, res) {
    res.render('payment', { title: '付款页' , active: {}});
});

module.exports = router;
