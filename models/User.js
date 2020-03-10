const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  name: String,
  githubId: String,
  githubUrl: String,
  imageUrl: String,
  solved_level: {
    difficulty_level_one: Number,
    difficulty_level_two: Number,
    difficulty_level_three: Number,
  },
  solved_all_cout: Number,
  solved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem"
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
