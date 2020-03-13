const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  userPhotoUrl: {
    type: String,
    required: true
  }
});

userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);
