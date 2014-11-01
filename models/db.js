var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pos');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('The mongodb connection is now open.')
});
