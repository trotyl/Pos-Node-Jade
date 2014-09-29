var express = require('express');
var router = express.Router();
var fixtures = require('../models/fixtures');

router.get('/', function(req, res) {
    res.render('admin', { items: fixtures.loadAllItems()});
});

module.exports = router;
