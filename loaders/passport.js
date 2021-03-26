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
    },
    async function (accessToken, refreshToken, profile, done) {
      const currentUser = await User.findOne({ sub: profile.id });

      if (currentUser) {
        done(null, currentUser);
      } else {
        const newUser = await new User({
          ...profile._json,
          failed_problem: [],
          solved_problem: [],
          accepted_submission: 0,
          total_submission: 0,
          submission_history: []
        }).save();

        done(null, newUser);
      }
    }
  )
);
