const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name."],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
  },
  githubId: String,
  profileUrl: String,
  score: {
    type: Number,
    default: 0,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
