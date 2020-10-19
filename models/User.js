const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  const user = this;

  try {
    const encryptedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = encryptedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);
