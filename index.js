require('dotenv').config()

const express = require("express");
const multer = require("multer");
const cors = require('cors')

const whitelist = ['https://www.eurocarpathian.com', 'http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

const app = express();


// parse requests of content-type - application/json
app.use(express.json({extended: false}));  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));   /* bodyParser.urlencoded() is deprecated */

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

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
    res.json({message: "Welcome to eurocarpathian API."});
});


require("./app/routes/auth.routes")(app, cors, corsOptions);
require("./app/routes/post.routes")(app, cors, corsOptions);
require("./app/routes/image.routes")(app, upload, cors, corsOptions);

app.use(cors());

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
