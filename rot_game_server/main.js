//Define secret variables required for hashing and google authentication.
var hashSecret;
var clietIdSecret;
var clientSecret;

//Make sure we have our super secret file with our super secret strings!!!
var fs = require('fs');
var path = './SuperSecret.txt',stats;

try {
    stats = fs.statSync(path);
    console.log("File exists.");
    var array = fs.readFileSync(path).toString().split("\n");
    hashSecret = array[0];
    clietIdSecret = array[1];
    clientSecret = array[2];
}
catch (e) {
  console.log("You are missing our SuperSecret.txt file!!!  Contact a ROT member for Super Secret Access!!!");
  process.exit();
}


//Set the port on which the server will listen
var serverPort = 80;

//Include ExpressJs and instantiate it
var express = require('express');
var app = express();
var session = require('express-session');
var router = express.Router();

//Include Passport and it's Google login mechanisms
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
app.use(session({ secret: hashSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Share everything in the public folder as static web content
app.use(express.static('public'));

//Include all routes
app.use(require('./routes/index'));
app.use(require('./routes/logout'));
app.use(require('./routes/LoginSuccess'));


//Setup listener for http://localhost/auth/google and define repsonse
app.get('/auth/google', passport.authenticate('google',  
    { scope: ['profile','email'] }), //this defines what info about the google account we are retrieving
    function(req, res){} // this never gets called
);


//Setup listener for http://localhost/oauth2callback to listen for google auth service responses
app.get('/oauth2callback', passport.authenticate('google',  
    { successRedirect: '/LoginSuccess', failureRedirect: '/' }
));


//Setup passport Google Auth Middleware function
passport.use(new GoogleStrategy({  
        clientID: clietIdSecret,
        clientSecret: clientSecret,
        callbackURL: 'http://localhost/oauth2callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));


//Passport session setup to serialize and unserialize user
passport.serializeUser(function(user, done) {  
    console.log("Serializing User");
    done(null, user);
    //done(null, user.id);
    //done(null, user.displayName);
});
passport.deserializeUser(function(obj, done) {  
    console.log("Deserializing User");
    console.log(obj);
    done(null, obj)
});


//Start Express web server
app.listen(serverPort, function () {
  console.log('Example app listening on port ' + serverPort + '!');
});

