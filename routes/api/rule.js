var express = require('express');
var router = express.Router();
var Rule = require('../../models/rule');

router.get('/', function (req, res) {
    Rule.all(function (result) {
        res.json(result);
    });
});

router.post('/', function (req, res) {
    var rule = req.body;
    Rule.createNew(rule, function (result) {
        res.json(result);
    });
});

module.exports = router;
