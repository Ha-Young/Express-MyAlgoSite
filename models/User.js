const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: [true, "A user must have an id"]
  },
  googleEmail: {
    type: String,
    required: [true, "A user must have an email"]
  },
  name: {
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);
