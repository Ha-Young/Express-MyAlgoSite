const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  githubId: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  avatarUrl: {
    type: String,
    unique: true,
    trim: true
  },
  profileUrl: {
    type: String,
    required: true,
    unique: true
  },
  solved: {
    type: [ mongoose.Types.ObjectId ],
    default: []
  }
});

module.exports = mongoose.model('User', UserSchema);
