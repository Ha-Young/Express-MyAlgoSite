const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  github_id: { type: String, required: true, unique: true },
  display_name: { type: String, required: true },
  username: { type: String, required: true },
  profile_url: String,
  avatar_url: String,
  solutions: [Object]
});

module.exports = mongoose.model('User', userSchema);
