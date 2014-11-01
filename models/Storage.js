var _ = require('lodash');
var Item = require('./item');
var mongodb = require('./db');

function Storage () {

}

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
                result.prepare();
                result.markModified('filter');
                result.save();
                callback(null, result);
            }).catch(function (err) {
                console.log(err);
                callback(err);
            }).done();
        })
    }
    else {
        Item.update({ id: item.id }, item, { upsert: true }).execQ().then(function (result) {
            result.prepare();
            result.markModified('filter');
            result.save();
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

Storage.bought = function (list, callback) {
    var amounts = {};
    var ids = _(list).map(function (item) {
        amounts[item.id] = item.amount;
        return item.id;
    }).value();
    var results;
    Item.find({ id: { $in: ids }}).execQ().then(function (result) {
        _(result).each(function (item) {
            if(item.amount < amounts[item.id]) {
                results = results || [];
                results.push(item);
            }
            else {
                item.amount -= amounts[item.id];
            }
        });

        if(results) {
            callback(null, results);
        }
        else {
            _(result).each(function (item) {
                item.save();
            });
            callback(null, null);
        }
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

Storage.render = function (rule, callback) {
    Item.find({ filter: { $or: rule }}).execQ().then(function (result) {
        callback(null, result);
    }).catch(function (err) {
        console.log(err);
        callback(err);
    }).done();
};

module.exports = Storage;
