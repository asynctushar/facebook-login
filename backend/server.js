const express = require('express');
var https = require("https");
var fs = require('fs');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const facebookRouter = require('./routes/facebookRouter');
const FacebookStrategy = require('passport-facebook').Strategy;

// express config
const app = express();
app.use(express.json());
dotenv.config();

// session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
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