const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  userName: String,
  googleId: String,
  picture: String
});

module.exports = mongoose.model("User", userSchema);
