const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config({
  path: './.env'
});

module.exports = passport => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const foundUser = await User.findOne();
          if (foundUser) {
            return done(null, foundUser);
          } else {
            const newUser = new User({
              githubId: profile.id,
              displayName: profile.displayName,
              provider: profile.provider
            });
            await newUser.save();
            return done(null, newUser);
          }
        } catch (err) {
          console.err(err);
        }
      }
    )
  );
};
