//Setup router for http://localhost/
var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    var response = 'Hello World!';
    response += '<br />';
    response += '<img src=/images/jetfighter.png alt="spaceship">';
    response += '<br />';
    response += '<a href="/LoginSuccess">Try visiting our protected page</a>';
    response += '<br />';
    response += '<a href="/auth/google">Or login with Google and visit the same page!</a>';
    res.send(response);
});

module.exports = router