var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    //Ensure there is not duplication in the email
    unique: true,
    required: true,
    //Removes whitespace
    trim: true
  },
  name: {
    type:String,
    required: true,
    trim: true,
  },
  webAddress: {
    type:String,
    required:true,
    trim: true

  },

  password: {
    type: String,
    required:true
  }

});
//PRESAVE HOOK
  //Runs before saving record! - middleware
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err,hash) {
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  })
});

//EXPORT Schema
var User = mongoose.model('User', UserSchema);
module.exports = User;
