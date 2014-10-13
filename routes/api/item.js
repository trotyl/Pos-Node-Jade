var express = require('express');
var router = express.Router();
var Storage = require('../../models/storage');

router.all('/', function (req, res) {
    Storage.allItems(function (err, result) {
        res.render('admin/list', { items: result || [] });
    });
});

router.all('/delete', function (req, res) {
    var name = req.body.name;
    Storage.removeItem(name, function () {
        res.send('');
    });
});

router.all('/create', function (req, res) {
    var params = {
        name: req.param('name'),
        amount: req.param('amount'),
        price: req.param('price'),
        unit: req.param('unit'),
        attrs: req.param('attributes')
    };
    Storage.addItem(params, function () {
        res.send('');
    });
});

router.all('/amount', function (req, res) {
    var name = req.param('name');
    var amount = req.param('amount');
    Storage.getItem(name, function (err, result) {
        result.amount = parseInt(amount);
        result.save();
        res.send('');
    });
});

module.exports = router;
