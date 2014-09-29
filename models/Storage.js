
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

Storage.add = function (item) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('cart', function (err, collection) {
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

module.exports = Storage;
