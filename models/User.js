const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  github_id: {
    type: String,
    unique: true,
    required: true,
  },
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
