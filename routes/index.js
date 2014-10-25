var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Storage = require('../models/storage');
var moment = require('moment');

/* GET home page. */

router.get('/', function(req, res) {
    res.render('index', { title: '首页' });
});

module.exports = router;
