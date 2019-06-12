var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3000/cathesauth', { useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;