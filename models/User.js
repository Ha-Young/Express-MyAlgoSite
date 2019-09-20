const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  githubId: {
    type: String,
    unique: true,
    required: true,
    default: null
  },
  displayName: {
    type: String,
    required: false
  },
  provider: {
    type: String,
    required: false,
    default: null
  }
});

module.exports = mongoose.model("User", userSchema);
