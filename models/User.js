const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required:  true
  },
});

module.exports = mongoose.model('User', userSchema);
