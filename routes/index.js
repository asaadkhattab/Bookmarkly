var express = require('express');
var router = express.Router();
var User =       require('../models/user');
var middleware = require('../middleware');

//********************* PROFILE *********************//
router.get('/profile', middleware.requiresLogin, function(req,res, next){

  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
        return res.render('profile', {title: 'Profile', name: user.name, webAddress: user.webAddress});
    }
  });
});
//********************* LOGOUT *********************//
router.get('/logout', function(req, res, next) {
  if (req.session) {
    //delete
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      }else {
        return res.redirect('/');
      }
    });

  }
});

//********************* LOGIN *********************//
router.get('/login', middleware.loggedOut, function(req, res, next) {
  return res.render('login', {title:'Login'});
});

router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password){
    //Call method on user object
    User.authenticate(req.body.email, req.body.password, function (error, user)
  {
    //Invalid Login
    if (error || !user) {
      var unauthorized = new Error('Wrong email or pass');
      unauthorized.status = 401;
      return next(unauthorized);
    }
    //Session
    else {
      req.session.userId = user._id;
      return res.redirect('/profile');
    }
  });

  } else {
    var unauthorized = new Error('Fill all fields');
    unauthorized.status = 401;
    return next(unauthorized);
  }
});

//********************* REGISTER *********************//
  //GET
router.get('/register', middleware.loggedOut, function(req, res, next) {
  return res.render('register', {title: 'Register'});
});

  //POST
router.post('/register', function(req, res, next) {

  if (req.body.email &&
      req.body.name &&
      req.body.webAddress &&
      req.body.password &&
      req.body.confirmPassword) {

        //PASSWORD CONFIRMATION CHECK
        if (req.body.password !== req.body.confirmPassword){
          var badRequest = new Error('Passwords do not match');
          badRequest.status = 400;
          return next(badRequest);
        }

        //CREATE OBJECT
        var userData = {
          email: req.body.email,
          name: req.body.name,
          webAddress: req.body.webAddress,
          password: req.body.password
        };

        //INSERT INTO MONGO
        User.create(userData, function(error, user){
          if(error){
            return next(error);
          }else{
            return res.redirect('/profile');
          }
        });

      } else {
        var badRequest = new Error('One field is empty!');
        badRequest.status = 400;
        return next(badRequest);
      }
})

//********************* HOME ********************* //
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

//********************* ABOUT ********************* //
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

//********************* CONTACT ********************* //
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});



//********************* EXPORT FILE ********************* //
module.exports = router;
