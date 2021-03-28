const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema({
  google_id: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  photo_url: {
    type: String
  }
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
