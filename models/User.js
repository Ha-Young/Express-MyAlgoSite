const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true
    },
    collect_problem: []
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
