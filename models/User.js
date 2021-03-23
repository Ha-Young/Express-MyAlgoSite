const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    required: true,
  },
  displayName: {
    type: String,
  },
  solvedProblem: {
    type:[mongoose.Schema.Types.ObjectId],
    ref: "problem",
    default: [],
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
