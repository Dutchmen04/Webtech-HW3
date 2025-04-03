const express = require('express');
const router = express.Router();

/*GET users listing.*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get("/settings", function(req, res){
  res.send('user settings!');
});

module.exports = router;


//this file created itself. I added afew things that are useless for the moment. I don't know what to do with it yet
