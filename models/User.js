const mongoose = require('mongoose');

const solvedProblemSchema = new mongoose.Schema({ //참조..
  solvedProblemObjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  userCode: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    required: true,
  },
  displayName: {
    type: String,
    trime: true,
  },
  solvedProblem: [solvedProblemSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
