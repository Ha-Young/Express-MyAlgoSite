const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: true,
  },

});

userSchema.pre('save', (next) => {
  const user = this;
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;

    if (user.salt !== saltRounds) {
      user.salt = saltRounds;
    }
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
