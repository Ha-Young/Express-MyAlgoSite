const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./models/User");
require("dotenv").config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/login/google/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    User.create({ googleId: profile.id });

    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(user)
  done(null, user);
});

module.exports = passport;
