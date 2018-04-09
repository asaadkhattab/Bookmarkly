var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Register
  //GET
router.get('/register', function(req, res, next) {
  return res.render('register', {title: 'Register'});
});

//REGISTER
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

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
