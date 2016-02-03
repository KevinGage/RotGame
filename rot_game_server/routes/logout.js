//Setup router for http://localhost/logout
var express = require('express')
var router = express.Router()
  
router.get('/logout', logout);

function logout(req, res){
  if(req.isAuthenticated()){
    req.logout();
  }
    res.redirect('/');
}

module.exports = router