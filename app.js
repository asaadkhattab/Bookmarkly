var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require ('connect-mongo')(session);
var app = express();

//**************** MONGODB CONNECTION ****************//
mongoose.connect("mongodb://localhost:27017/bookmarkly");
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'The Error: '));

//**************** SESSION ****************//
app.use(session({
  secret: 'welcome to bookmark',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: database
  })
}));

//******** MAKE USER ID AVAILABLE IN TEMPLATES********//

app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

//**************** PARSE INCOMING REQUESTS****************//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//**************** SERVE STATIC FILES ****************//
app.use(express.static(__dirname + '/public'));

//**************** PUG ENGINE ****************//
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//**************** ROUTES ****************//
var routes = require('./routes/index');
app.use('/', routes);

//**************** 404 ****************//
app.use(function(req, res, next) {
  var notFound = new Error('File Not Found');
  notFound.status = 404;
  next(notFound);
});

//**************** CALLBACK ****************//
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//**************** PORT 3000 ****************//
app.listen(3000, function () {
  console.log('Express app listening on port 3000.');
});
