const dotenv = require('dotenv');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const init = require('./init');
const User = require('../models/User');

dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/login/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      const searchQuery = {
        name: profile.displayName
      };

      const updates = {
        name: profile.displayName,
        someID: profile.id
      };

      const options = {
        upsert: true
      };

      User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
        return err ? done(err) : done(null, user);
      });
    }
  )
);

init();

module.exports = passport;
