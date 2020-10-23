const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ id: id }, (error, user) => {
      done(error, user);
    });
  });

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/github/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    const { id, username } = profile;

    try {
      const existingUser = await User.findOne({ id: id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await User.create({
        id: id,
        username: username
      });
      done(null, newUser);
    } catch (error) {
      // 에러 세분화
      next(error);
    }
  }));
};