const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");
const configs = require(".");

passport.use(new GoogleStrategy(
  {
    clientID: configs.googleClientId,
    clientSecret: configs.googleClientSecret,
    callbackURL: "https://solsol-codewars.herokuapp.com/auth/google/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({
      google_id: profile.id,
      email: profile.emails[0].value,
      username: profile.displayName,
      photo_url: profile.photos[0].value,
    }, (err, user) => {
      user.save();
      return done(null, user);
    });
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
