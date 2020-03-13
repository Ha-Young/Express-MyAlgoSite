const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  someID: String
});

module.exports = mongoose.model('User', userSchema);
