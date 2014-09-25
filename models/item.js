var mongodb = require('./db');
var _ = require('lodash');

function Item(barcode, name, unit, price, type, count, promotion) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price;
    this.type = type;
    this.count = count || 0;
    this.promotion = promotion || false;
}

module.exports = Item;

Item.prototype.store = function (callback) {
    var self = this;
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('items', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.update({barcode: self.barcode}, self, {
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

Item.prototype.join = function (callback) {
    var self = this;
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('items', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.insert(self, {
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

Item.prototype.getPromotion = function (promotions) {
    var self = this;
    var list = _(promotions).findWhere({type: 'BUY_TWO_GET_ONE_FREE'}).barcodes;
    if(_(list).contains(self.barcode)) {
        this.promotion = true;
    }
};

Item.prototype.addCount = function() {
    this.count++;
    this.store();
};

Item.prototype.minusCount = function () {
    if(this.count <= 0) {
        return;
    }
    this.count--;
    this.store();
};

Item.prototype.sumDisplay = function () {
    var extraSum = this.free() > 0? ' (原价：' + this.total() + '元)': '';
    return this.fare() + '元' + extraSum;
};

Item.prototype.free = function () {
    return this.promotion? Math.floor(this.count / 3): 0;
};

Item.prototype.total = function () {
    return this.count * this.price;
};

Item.prototype.fare = function () {
    return (this.count - this.free()) * this.price;
};

Item.prototype.saving = function () {
    return this.free() * this.price;
};

