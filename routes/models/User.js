const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const option = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  photo: {
    type: String,
    default: 'https://lh5.googleusercontent.com/-iH_kakcyBsU/AAAAAAAAAAI/AAAAAAAAAAA/nPtjPTcRZUI/photo.jpg'
  },
  provider: String,
}, option);

userSchema.index({ profile: 1, type: 1 });

module.exports = mongoose.model('User', userSchema);
