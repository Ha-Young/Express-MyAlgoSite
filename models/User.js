const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Please tell us your username!'],
    maxlength: 15,
    minlength: 2,
  },
  password: {
    type: String,
    unique: true,
    required: [true, 'Please provide a password'],
    maxlength: 50,
    minlength: 8,
    select: false,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.statics.authenticate = async function (email, password, callback) {
  try {
    const user = await User.findOne({ email: email }).select('+password').lean();
    let result;

    if (user) {
      result = await bcrypt.compare(password, user.password);
    }

    if (!user || !result) {
      return callback(null, false, { message: 'Incorrect email or password.' });
    }

    delete user.password;
    return callback(null, user);
  } catch (err) {
    callback(err);
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
