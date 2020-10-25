const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  githubId: { type: String, require: true },
  userName: String
});

module.exports = mongoose.model('User', userSchema);
