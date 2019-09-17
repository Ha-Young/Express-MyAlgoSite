const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('User', userSchema);
