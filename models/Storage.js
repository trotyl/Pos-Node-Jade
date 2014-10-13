var _ = require('lodash');
var mongodb = require('./db');
var Item = require('./item');

function Storage () {

}

Storage.allItems = function (callback) {
    return Item.find().execQ().then(function(result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    });
};

Storage.addItem = function (params, callback) {
    var item = new Item({
        name: params.name,
        amount: params.amount,
        price: params.price,
        unit: params.unit,
        attrs: params.attrs
    });
    item.save(function (err) {
        if(err) {
            console.log(err);
        }
    });
};

Storage.getItem = function (name, callback) {
    Item.findOne({ name: name }).execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    });
};

Storage.removeItem = function (name, callback) {
    Item.remove({ name: name }).execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    });
};

Storage.renderItems = function (list, callback) {
    Item.find({ name: { $in: list }}).execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    });
};

module.exports = Storage;
