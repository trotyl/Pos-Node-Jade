var _ = require('lodash');
var Item = require('./item');
var mongodb = require('./db');

function Storage () {

}

Storage.all = function (callback) {
    Item.find({ amount: { $gt: 0 }}).execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.page = function (page, callback) {
    Item.find().sort({ birth: 'desc' }).skip(10 * (page - 1)).limit(10).execQ().then(function(result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.count = function (callback) {
    Item.count().execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.get = function (itemId, callback) {
    Item.findOne({ id: itemId }).execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.update = function (item, callback) {
    if(item.id === 'ITEM0000') {
        Storage.count(function (err, count) {
            count = (count + 1).toString();
            while(count.length < 4) {
                count = '0' + count;
            }
            item.id = 'ITEM' + count;
            Item.update({ id: item.id }, item, { upsert: true }).execQ().then(function (result) {
                callback(null, result);
            }).catch(function (err) {
                console.log(err);
                callback(err);
            }).done();
        })
    }
    else {
        Item.update({ id: item.id }, item, { upsert: true }).execQ().then(function (result) {
            callback(null, result);
        }).catch(function (err) {
            console.log(err);
            callback(err);
        }).done();
    }
};

Storage.remove = function (itemId, callback) {
    Item.remove({ id: itemId }).execQ().then(function(result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

module.exports = Storage;
