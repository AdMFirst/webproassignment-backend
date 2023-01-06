const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;

db.users = require('./user.schema.js')(mongoose);
db.contoh = require('./contoh.schema.js')(mongoose);

module.exports = db;
