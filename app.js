var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//SERVE STATIC FILES
app.use(express.static(__dirname + '/public'));

//TEMPLATE ENGINE *PUG*
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// ROUTES
var routes = require('./routes/index');
app.use('/', routes);

//404 AND ERROR HANDLER
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

//APP.UES CALLBACK
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
