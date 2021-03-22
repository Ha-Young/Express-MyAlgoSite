const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Problem = new mongoose.Schema({
  _id: {
    type: mongoose.ObjectId,
    index: true,
  },
  score: Number,
  solved: Boolean,
  code: String,
});

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.ObjectId,
    index: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    match: /(\b.+\@.+\..+\b)/,
  },
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  exprience: Number,
  kyu: Number,
  problems: [Problem],
});

UserSchema.plugin(passportLocalMongoose, {usernameField: "email"})

module.exports = mongoose.model('User', UserSchema);
