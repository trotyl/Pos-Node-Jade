var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/add_item', function (req, res) {
    var name = req.body.name;
    Order.getItem(name, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            if (result) {
                result.addCount();
                result.store(function (err) {
                    if(err) {
                        res.send(err);
                    }
                    res.send(true);
                });
            }
            else {
                result = _(fixtures.loadAllItems()).find({name: name});
                result.addCount();
                result.getPromotion(fixtures.loadPromotions());
                result.join(function () {
                    res.send(true);
                });
            }
        }
    });
});

module.exports = router;
