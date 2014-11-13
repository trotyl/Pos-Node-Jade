var express = require('express');
var router = express.Router();
var Rule = require('../../models/rule');
var Item = require('../../models/item');

router.get('/', function (req, res) {
    Rule.all(function (rules) {

    });
});

router.post('/', function (req, res) {
    var rule = req.body;
    Rule.createNew(rule, function (result) {
        res.json(result);
    });
});

module.exports = router;
