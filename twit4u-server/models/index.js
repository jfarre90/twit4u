const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise; // very important to use ES2015 promise syntax
mongoose.connect('mongodb://localhost/twit4u', {
    keepAlive: true,
    useNewUrlParser: true
    // useMongoClient: true // not necessary with mongoose 5.x
});

module.exports.User = require('./user');
module.exports.Message = require('./message'); //Because this is exported after the user model, User can access this, but the message cannot, thats why on the message model we have had to call it.