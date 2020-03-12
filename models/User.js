import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  githubId: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default model('User', userSchema);
