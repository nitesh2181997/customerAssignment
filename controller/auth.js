var passport = require('passport');
var User = require('../models/User')

module.exports.register = async function(req, res) {

  var user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.userType = req.body.userType;
  user.userId = req.body.userID;

  user.save(function(err,user) {
    if(err){
      res.status(200);
      res.json({
        status: {
            code: 400,
            message: 'Error occured'
        },
        data: err
      });
    }else{
      res.status(200);
      res.json({
        status: {
            code: 200,
            message: 'User inserted successfully'
        },
        data: null
      });
    }
  });
};

module.exports.login = function(req, res) {
  let user = req.body;
  passport.authenticate('local', function(err, user, info){
    var token;

    if (err) {
      res.status(404).json(err);
      return;
    }

    if(user){ 
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info); 
    }
  })(req, res);
};