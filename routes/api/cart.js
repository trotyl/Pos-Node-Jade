var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Storage = require('../../models/storage');

router.all('/', function(req, res) {
    var cart = JSON.parse(req.param('cart'));
    var list = _(cart).map(function (amount, name) {
        return name;
    }).value();
    Storage.renderItems(list, function (err, result) {
        _(result).each(function (item) {
            item.count = cart[item.name];
        });
        res.render('cart', {items: result, total: 0})
    });
});

router.all('sum', function (req, res) {
    var name = req.param('name');

});

module.exports = router;