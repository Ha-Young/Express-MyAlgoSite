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
  solvedAllCount: { type: Number },
  solvedLevelOne: { type: Number },
  solvedLevelTwo: { type: Number },
  solvedLevelThree: { type: Number },
  solved: [
    {
      type: mongoose.ObjectId,
      ref: "Problem"
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
