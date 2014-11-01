var express = require('express');
var router = express.Router();
var Item = require('../../models/item');

router.get('/available', function (req, res) {
    Item.all(function (result) {
        res.json(result);
    });
});

router.post('/pay', function (req, res) {
    var list = req.body;
    Storage.bought(list, function (err, result) {
        res.json({ message: result });
    })
});

module.exports = router;
