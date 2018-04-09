var mongoose = require('mongoose');
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

//EXPORT Schema
var User = mongoose.model('User', UserSchema);
module.exports = User;
