const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    }, //TODO change to async
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ sub: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          new User({
            ...profile._json,
            failed_problem: [4, 5],
            solved_problem: [1, 2, 3],
            accepted_submission: 0,
            total_submission: 0
          }).save().then((newUser) => {
            done(null, newUser);
          });
        }
      });
    }
  )
);
