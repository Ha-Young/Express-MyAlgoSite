import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  githubId: {
    type: Number,
    unique: true,
    required: true
  },
  avatarUrl: String
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default model('User', userSchema);
