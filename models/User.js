const mongoose = require('mongoose');
//const validator = require('validator');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
    lowercase: true,
    //validate: [validator.isEmail, 'Please provide a valid email']
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Please tell us your username!'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    maxlength: 20,
    select: false
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
