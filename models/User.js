const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
