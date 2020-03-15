const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  githubId: {
    type: String,
    required: true,
    unique: true
  },
  githubUrl: {
    type: String,
    unique: true
  },
  imageUrl: String,
  solved: [
    {
      type: mongoose.ObjectId,
      ref: "Problem"
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
