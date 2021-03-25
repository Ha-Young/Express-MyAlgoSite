const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
/*

  TODO: Fill in the model specification

 */


const solvedProblemSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    require: true,
  },
  title: {
    type: String,
  },
  isSolved: {
    type: Boolean,
    require: false,
  },
  code: {
    type: String,
    trim: true,
  },
});

const userSchema = new mongoose.Schema({
  name: { type: String, maxlength:20, require: true },
  email: { type: String, require: true, unique: true, index: true, },
  password: { type: String, require: true },
  problems: [solvedProblemSchema],
});

const saltRounds = 10;

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }

        user.password = hash;
        next();
      });
    });
  }
});

module.exports = mongoose.model("User", userSchema);
