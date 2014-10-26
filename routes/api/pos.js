var express = require('express');
var router = express.Router();
var Storage = require('../../models/storage');

router.get('/available', function (req, res) {
    Storage.all(function (err, result) {
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
