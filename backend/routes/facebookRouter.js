const express = require('express');
const passport = require('passport');
const isLoggedIn = require('../middleware/auth');

const router = express.Router();

// route
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/api',
    failureRedirect: '/api'
}));

router.get('/',isLoggedIn, (req, res) => {
    if (req.user) {
        return res.status(200).json({
            user: req.user
        });
    }

    return res.status(400).json({
        message: "Please authenticate"
    })
});

router.get('/logout', (req, res) => {
    req.logout(() => {
        console.log('Logged Out')
    });
    return res.status(200).json({
        message: "Logged Out"
    })
});

module.exports = router;
