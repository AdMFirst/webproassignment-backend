const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.posts = require("./post.model.js")(mongoose);
db.images = require("./image.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.videos = require("./video.model.js")(mongoose);
db.members = require("./member.model.js")(mongoose);

module.exports = db;
