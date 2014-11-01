var express = require('express');
var router = express.Router();
var Rule = require('../../models/rule');

router.get('/', function (req, res) {
    res.json('');
});

router.post('/', function (req, res) {
    var rule = req.body;
    Rule.createNew(rule, function (result) {
        res.json(result);
    });
});

module.exports = router;
