const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: `${process.env.CLIENT_ID_GITHUB}`,
      clientSecret: process.env.CLIENT_SECRET_GITHUB,
      callbackURL: process.env.CALLBACK_URL_GITHUB,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const searched = await User.findOne({ github_id: profile.id });
      if (searched) return cb(null, searched);

      const created = await User.create({
        github_id: profile.id,
        github_token: accessToken,
      });

      if (created) return cb(null, created);
    }
  )
);
