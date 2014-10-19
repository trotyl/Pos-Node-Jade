var _ = require('lodash');
var Item = require('./item');
var mongodb = require('./db');

function Storage () {

}

Storage.allItems = function (page, callback) {
    Item.find().sort({ birth: 'desc' }).skip(10 * (page - 1)).limit(10).execQ().then(function(result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.itemCount = function (callback) {
    Item.find().execQ().then(function(result) {
        callback(null, result.length);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.addItem = function (params, callback) {
    var item = new Item({
        name: params.name,
        amount: params.amount,
        price: params.price,
        unit: params.unit,
        attrs: params.attrs,
        birth: new Date
    });
    item.save(function (err) {
        if(err) {
            console.log(err);
            return callback(err);
        }
        callback(null);
    });
};


Storage.updateItem = function (params, callback) {
    Item.update({ name: params.name }, {
        amount: params.amount,
        price: params.price,
        unit: params.unit,
        attrs: params.attrs
    }).execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.getItem = function (name, callback) {
    Item.findOne({ name: name }).execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.removeItem = function (name, callback) {
    Item.remove({ name: name }).execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.renderItems = function (list, callback) {
    Item.find({ name: { $in: list }}).execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.addAttribute = function (name, attr_name, attr_val, callback) {
    Item.findOne({ name: name }).execQ().then(function (result) {
        console.log(result);
        result.attrs = result.attrs || {};
        result.attrs[attr_name] = {
            name: attr_name,
            val: attr_val,
            time: (new Date).valueOf()
        };
        Item.update({ name: name }, { $set: { attrs: result.attrs } }, function (res) {
            callback(null, res);
        });
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.removeAttribute = function (name, attr, callback) {
    Item.findOne({ name: name }).execQ().then(function (result) {
        delete result.attrs[attr];
        Item.update({ name: name }, { $set: { attrs: result.attrs } }, function (res) {
            callback(null, res);
        });
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

module.exports = Storage;
