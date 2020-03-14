const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name : { type: String , required: true },
  githubID: { type: String, required: true },
  githubURL: { type: String, required: true },
  score: { type: Number, required: true, default: 0, min: 0 }
}, {
  versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
