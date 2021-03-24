const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Schema } = mongoose;
const {
  Types: { ObjectId, Mixed },
} = Schema;

const solvedSchema = new Schema({
  problem: {
    type: ObjectId,
    ref: "Problem",
  },
  answer: {
    type: String,
  },
  result: {
    type: Boolean,
  },
});

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

userSchema.methods.generateToken = function (cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SESSION_SECRET);

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  jwt.verify(token, "secret", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
