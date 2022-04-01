const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.posts = require("./post.model.js")(mongoose);
db.images = require("./image.model.js")(mongoose);

module.exports = db;
