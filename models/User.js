const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  name: {
    familyName: {
      type: String,
      required: true
    },
    givenName: {
      type: String,
      required: true
    }
  },
  photos: [{ String }],
  locale: {
    type: String,
    default: 'kr'
  },
  completed_problems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }],
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
