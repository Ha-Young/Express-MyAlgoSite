const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    index: true
  },
  name: {
    familyName: String,
    givenName: String
  },
  photos: [{}],
  locale: String,
  completed_problems: [Number],
  publishedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
