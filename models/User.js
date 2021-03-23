const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  userNickname: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: String,
    unique: true,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    unique: true,
    required: true
  }
});

userSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified("userPassword")) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        next(err);
        return;
      }

      bcrypt.hash(user.userPassword, salt, (err, hash) => {
        if (err) {
          next(err);
          return;
        }

        user.userPassword = hash;
        next();
      });
    });
  }
});

module.exports = mongoose.model('User', userSchema);
