const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Please tell us your username!'],
    minlength: 2,
    maxlength: 15,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    maxlength: 20,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
