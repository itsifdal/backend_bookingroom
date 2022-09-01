const express = require("express");
const bodyParser = require("body-parser");
const cors  = require("cors");
const path  = require('path');

const session = require('express-session');

// Models
const db = require("./app/models");

//intialize app
const app = express();
let whiteList = ['http://localhost:8080'];
let corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//create session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'helcurtabyss',
    name:   'ifdalcore',
    cookie: {
        sameSite: true,
    },
}))

// Sync database
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Booking Room RESTAPI" });
});

// Routes
require("./app/routes/login.routes")(app);
require("./app/routes/forgotpassword.routes")(app);
require("./app/routes/resetpassword.routes")(app);

require("./app/routes/room.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/booking.routes")(app);


// Setting folder views
app.set('views',path.join(__dirname,'app/views'));
app.set('view engine', 'ejs');


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});