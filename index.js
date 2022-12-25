require('dotenv').config()

const express = require("express");
const cors = require('cors');
const compression = require("compression");
const helmet = require("helmet");

const whitelist = ['https://swift-react-js.vercel.app/', 'http://localhost:3000']
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
app.use(compression);
app.use(helmet);

// parse requests of content-type - application/json
app.use(express.json({extended: false}));  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));   /* bodyParser.urlencoded() is deprecated */

// removed multer cause some vulnerability


const db = require("./app/models/schema");
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

app.get("/", (req, res) => {
    res.json({message: "Welcome to Swift E-Learning API."});
});


require("./app/routes/auth.routes")(app, cors, corsOptions);
require("./app/routes/protected.routes")(app, cors, corsOptions);


app.use(cors(corsOptions));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
