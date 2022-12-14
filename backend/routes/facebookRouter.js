const express = require('express');
const passport = require('passport');
const isLoggedIn = require('../middleware/auth');

const router = express.Router();

// route
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'https://localhost:3000/'
}))

router.get('/', isLoggedIn, (req, res) => {
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
        res.redirect('https://localhost:3000/')
    });
    
});

module.exports = router;
