var express = require('express');
var router = express.Router();

//GET
router.get('/', function(req, res, next) {
  return res.render('index', {title:'Home'});
});

//GET About
router.get('/about', function(req,res, next){
  return res.render('about', {title:'About Us'});
});

//Contact
router.get('/contact', function(req,res, next) {
  return res.render('contact', {title: 'Contact'});
});

module.exports = router;
