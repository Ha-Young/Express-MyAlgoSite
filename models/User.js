const mongoose = require('mongoose');

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
  solvedProblem: { // extra 작성 코드 넣어줘야 하는가
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Problem",
    default: [],
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
