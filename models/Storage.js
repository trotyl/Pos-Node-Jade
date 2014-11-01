var _ = require('lodash');
var Item = require('./item');
var mongodb = require('./db');

function Storage () {

}

Storage.render = function (rule, callback) {
    Item.find({ filter: { $or: rule }}).execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

module.exports = Storage;
