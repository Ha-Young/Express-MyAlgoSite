const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/auth/google/callback'
  }, async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    const id = profile.id;
    const email = profile.emails[0].value;
    const photo = profile.photos[0].value;
    const provider = profile.provider;
    const newUser = {
      profile: {
        id,
        email,
        photo,
        provider
      }
    };

    User.findOne({ id: profile.id }, (err, user) => {
      if (user) return done(null, user);

      User(newUser).save();
      done(err, user);
    });
  }));
