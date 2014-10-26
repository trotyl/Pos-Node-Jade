var express = require('express');
var router = express.Router();
var Storage = require('../../models/storage');

router.get('/available', function (req, res) {
    Storage.all(function (err, result) {
        res.json(result);
    });
});

router.get('/pay', function (req, res) {
    console.log(req.body);
    res.send('');
});

module.exports = router;
