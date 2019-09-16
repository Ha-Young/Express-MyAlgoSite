const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  platform_name: String,
  social_id: String,
  nickname: String,
  profile_image_url: String
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
