var _ = require('lodash');
var mongodb = require('./db');
var Item = require('./item');

function Storage () {

}

Storage.all = function () {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('storage', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.find({}).toArray(function (err, result) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                var list = _(result).map(function (stat) {
                    return new Item(stat.barcode, stat.name, stat.unit, stat.price, stat.type, stat.count, stat.promotion);
                }).value();
                callback(null, list);
                mongodb.close();
            });
        });
    });
};

Storage.add = function (item, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('storage', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.insert(item, {
                safe: true
            }, function (err) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                callback();
            });
        });
    });
};

Storage.getItem = function (name, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('storage', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name: name}, function (err, stat) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                var item = !stat? stat: new Item(stat.barcode, stat.name, stat.unit, stat.price, stat.type, stat.count, stat.promotion);
                callback(null, item);
            });
        });
    });
};

Storage.removeItem = function (name, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('storage', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.remove({name: name}, function (err) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

module.exports = Storage;
