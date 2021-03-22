const mongoose = require('mongoose');

const problemsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.ObjectId,
    index: true,
  },
  score: Number,
  solved: Boolean,
  code: String,
});

const userSchema = new mongoose.Schema({
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
  problems: [problemsSchema],
});

module.exports = mongoose.model('User', userSchema);
