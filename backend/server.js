const express = require('express');
var https = require("https");
var fs = require('fs');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const facebookRouter = require('./routes/facebookRouter');
const FacebookStrategy = require('passport-facebook').Strategy;
const cors = require('cors');

// express config
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors({
    origin: 'https://localhost:3000',
    optionsSuccessStatus: 200,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))

// session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: "session",
    keys: ["lama"],
    maxAge: 24 * 60 * 60 * 100,
    httpOnly: true,  // dont let browser javascript access cookie ever
    secure: true, // only use cookie over https
    ephemeral: true


}));
app.use(passport.initialize());
app.use(passport.session());

// facebook authentication
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    // extra feature
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']
},
    (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile)
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


// routes
app.use("/api", facebookRouter);

// server
https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
}, app).listen(process.env.PORT, () => {
    console.log(`App started at port:${process.env.PORT}`)
})