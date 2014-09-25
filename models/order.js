var _ = require('lodash');
var mongodb = require('./db');
var Item = require('./item');

function Order () {
}

Order.all = function (callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('items', function (err, collection) {
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

Order.getItem = function (name, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('items', function (err, collection) {
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

Order.clear = function (callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('items', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.remove({}, function (err) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

Order.getCartStats = function (list) {
    var count = 0, total = 0, saving = 0;
    _(list).each(function (item) {
        count += item.count;
        total += item.fare();
        saving += item.saving();
    });
    return { count: count, total: total, saving: saving };
};

Order.getPromotion = function () {
    var promotions = loadPromotions();
    _(two_with_one_list).each(function (barcode) {
        var item = items[barcode];
        if(item && !item.promotion) {
            item.getPromotion();
        }
    }, this);
};

module.exports = Order;
