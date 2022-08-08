// route middleware
const isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(400).json({
        message: "Please authenticate"
    })
}

module.exports = isLoggedIn;