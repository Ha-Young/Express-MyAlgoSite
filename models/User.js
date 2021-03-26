const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
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
  problems: [{
    id: Number,
    status: String,
    code: String,
  }],
  score: {
    type: Number,
    default: 0,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/**
 * verify input password
 * @param {string} candidatePassword submitted password
 * @param {string} userPassword password stored in DB
 * @returns {boolean} if password is correct
 */
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', UserSchema);
