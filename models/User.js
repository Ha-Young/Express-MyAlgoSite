const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  signedDate: {
    type: Date,
    default: Date.now,
  },
  completedProblems: [{ type: Schema.Types.ObjectId, ref: "Problem" }],
});

module.exports = mongoose.model("User", userSchema);
