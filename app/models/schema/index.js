const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI

db.posts = require("./post.schema.js")(mongoose);
db.users = require("./user.schema.js")(mongoose);
db.members = require("./member.schema.js")(mongoose);

module.exports = db;
