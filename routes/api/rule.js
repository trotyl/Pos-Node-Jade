var express = require('express');
var router = express.Router();
//var Storage = require('../../models/storage');

router.get('/', function (req, res) {
    res.json('');
});

router.post('/', function (req, res) {
    var rule = req.body;
    res.json('');
});

module.exports = router;
