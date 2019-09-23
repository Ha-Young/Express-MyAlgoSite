const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');
const urls = require('../constants');
require('dotenv').config();

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findById(id);

      if (!user) {
        done(new Error('User Not Found'));
      } else {
        done(null, user);
      }
    } catch(err) {
      done(err);
    }
  });

  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: urls.githubUrl,
      scope: [ 'user: email' ]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ user_id: profile.id });

        if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            user_id: profile.id,
            username: profile._json.name,
            login_with: 'github'
          });

          newUser.save();
          done(null, newUser);
        }
      } catch(err) {
        done(err);
      }
    }
  ));

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: urls.googleUrl,
      scope: [urls.googleScope]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ user_id: profile.id });

        if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            user_id: profile.id,
            username: profile._json.name,
            login_with: 'google'
          });

          newUser.save();
          done(null, newUser);
        }
      } catch(err) {
        done(err);
      }
    }
  ));
}
