const mongoose = require("mongoose");
const Problem = require("./Problem");
const bcrypt = require("bcrypt");

/*

  TODO: Fill in the model specification

 */
const solvedProblemSchema = new mongoose.Schema({
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true
  },
  code: {
    type: String,
    required: true
  },
  isSolved: {
    type: Boolean,
    required: true
  },
  _id: false
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    unique: true,
    required: true
  },
  id: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  side: {
    type: String,
    required: true,
  },
  submitted_problems: [solvedProblemSchema]
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
      next();
    } catch (err) {
      next(err);
    }
  }
});

module.exports = mongoose.model("User", userSchema);
