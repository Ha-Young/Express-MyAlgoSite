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
  solved_level: {
    difficulty_level_one: { type: Number, default: 0 },
    difficulty_level_two: { type: Number, default: 0 },
    difficulty_level_three: { type: Number, default: 0 },
  },
  solved_all_cout: { type: Number, default: 0 },
  solved: [
    {
      type: mongoose.ObjectId,
      ref: "Problem"
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
