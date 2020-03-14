const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}, function (accessToken, refreshToken, profile, cb) {
  const existingUser = User.findOne({ githubId: profile.id },
    function (err, user) {
      return cb(err, user);
    }
  );

  if (!existingUser) {
    User.save({ githubId: profile.id });
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

