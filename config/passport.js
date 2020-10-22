const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

module.exports = passport => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CB_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const {
          id: userId,
          username,
          photos: [{ value: avatar }],
        } = profile;

        try {
          const user = await User.findOne({ userId });

          if (!user) {
            const newUser = await User.create({
              userId,
              username,
              avatar,
            });
            return done(null, newUser);
          } else {
            return done(null, user);
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
