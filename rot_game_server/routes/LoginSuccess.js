//Setup router for http://localhost/LoginSuccess
var express = require('express')
var router = express.Router()
var ensureAuthenticated = require('../bin/ensureAuthenticated')

router.get('/LoginSuccess', ensureAuthenticated, function (req, res) {
    var response = 'You are logged in!';
    response += '<br />';
    response += 'Hello ' + req.user.displayName + '!';
    response += '<br />';
    response += '<a href="/">Back to homepage without logging out?</a>';
    response += '<br />';
    response += '<a href="/logout">Logout</a>';
    res.send(response);
});

module.exports = router