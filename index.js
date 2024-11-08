require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // ummm what is helmet??

const whitelist = [process.env.FRONT_END_URI];
const corsOptions = {
  origin: function(origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

const app = express();
app.use(helmet());

// parse requests of content-type - application/json
app.use(express.json({extended: false})); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true})); /* bodyParser.urlencoded() is deprecated */

// removed multer cause some vulnerability

app.get('/', (req, res) => {
  res.json({message: 'Welcome to Swift E-Learning API.'});
});

const db = require('./app/models/schema');
require('./app/routes/auth.routes')(app, cors, corsOptions);
require('./app/routes/protected.routes')(app, cors, corsOptions);
require('./app/routes/materi.routes')(app, cors, corsOptions);
require('./app/routes/soal.routes')(app, cors, corsOptions);
require('./app/routes/historyTugas.routes')(app, cors, corsOptions);


app.use(cors(corsOptions));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Connected to the database!');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch((err) => {
      console.log('Cannot connect to the database!', err);
      process.exit();
    });


