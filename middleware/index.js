//THIS MIDDLEWARE PREVENTS LOGGED IN USERS FROM ACCESSING A ROUTE
function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
}

//DETERMINES IF USER IS LOGGED IN
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var unauthorized = new Error('Must be logged in');
    unauthorized.status = 401;
    return next(unauthorized);
  }
}

//EXPORT MIDDLEWARE FUNCTIONS
module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
