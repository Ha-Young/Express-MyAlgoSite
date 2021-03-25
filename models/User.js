const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { Schema } = mongoose;
const {
  Types: { ObjectId, Mixed },
} = Schema;

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    // minlength: 5,
    required: true,
  },
  answers: {
    type: Mixed,
    default: {},
  },
  rating: {
    type: Number,
    default: 0,
  },
  solvedProblems: {
    type: [ObjectId],
    ref: "Problem",
  },
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
