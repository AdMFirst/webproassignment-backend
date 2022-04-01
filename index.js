require('dotenv').config()

const express = require("express");
const multer = require("multer");

const app = express();



// parse requests of content-type - application/json
app.use(express.json({ extended: false }));  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to eurocarpathian API." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/image.routes")(app, upload);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
