const express = require('express');
const router = express.Router();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./routes/models/User');
const passport  = require('passport');

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  }, async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    const userId = profile.id;
    const email = profile.emails[0].value;
    const photo = profile.photos[0].value;
    const provider = profile.provider;
    const newUser = {
      userId,
      email,
      photo,
      provider,
    };

    try {
      const user = await User.findOne({ email: email }).exec();
      if (user) {
        return done(null, user);
      } else {
        await User(newUser).save();
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  }));

module.exports = router;
