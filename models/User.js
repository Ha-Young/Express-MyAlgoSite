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

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.updateProblems = async function (id, status, code) {
  console.log(this);
  // this.id = id;
  // this.status = status;
  // this.code = code;

  // await this.save();
};

module.exports = mongoose.model('User', UserSchema);
