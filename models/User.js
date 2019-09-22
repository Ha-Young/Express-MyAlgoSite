const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  platform_name: {
    type: String,
    required: true
  },
  social_id: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  profile_image_url: String
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
