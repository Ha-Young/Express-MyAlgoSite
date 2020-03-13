const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

const User = require('../models/User');

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/github/callback'
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const { login: githubId, name: userName, avatar_url: avatarUrl, url: profileUrl } = profile._json;
      const condition = { githubId };
      const update = { userName, avatarUrl, profileUrl };
      const options = { new: true, upsert: true, setDefaultsOnInsert: true };

      const user = await User.findOneAndUpdate(condition, update, options);

      cb(null, user);
    } catch(err) {
      cb(err);
    }
  })
);
