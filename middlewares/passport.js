const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

module.exports = function passport(passport) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/login/github/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    const userData = {
      user_id: profile.id,
      user_name: profile.username,
      signup_date: new Date().toISOString()
    };

    try {
      const targetUser = await User.findOne({ user_id : profile.id });
      if (targetUser) {
        done(null, targetUser);
      } else {
        const newUser = await new User(userData).save();
        done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
}
