const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  userId: {
    google: {
      type: String,
      required: [true, "userId is required if someone is logged in"],
      unique: true,
    }
  },
  name: { type: String },
  photos: { type: String },
  locale: { type: String },
});

module.exports = mongoose.model("User", userSchema);
