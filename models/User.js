const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Problem = new mongoose.Schema({
  score: Number,
  solved: Boolean,
  code: String,
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    match: /(\b.+\@.+\..+\b)/,
  },
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  isGoogle: Boolean,
  isGithub: Boolean,
  exprience_point: Number,
  kyu: Number,
  problems: [Problem]
});

UserSchema.plugin(passportLocalMongoose, {usernameField: "email"})

module.exports = mongoose.model("User", UserSchema);
