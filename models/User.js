const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName : String,
  googleId: String,
  thumbnail: String,
  locale: String
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
