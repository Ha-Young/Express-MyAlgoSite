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
  },
  profile_img_url: {

  },
  problems: [{
    problem_id: Number,
    status: String,
    writed_code: String
  }]
}, {
  timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('User', userSchema);
