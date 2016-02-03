//Setup authentication check middleware
function ensureAuthenticated(req, res, next) {  
    if (req.isAuthenticated()) { return next(); }
    res.sendStatus(401);
}

module.exports = ensureAuthenticated