const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 id: '52588326',
  displayName: null,
  username: 'raeyoung-kim',
  profileUrl: 'https://github.com/raeyoung-kim',
  photos: [
    { value: 'https://avatars2.githubusercontent.com/u/52588326?v=4' }
  ],
  provider: 'github',

 */
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profileUrl: {
    type: String,
    unique: true
  },
  provider: String
});

module.exports = mongoose.model('User', userSchema);
