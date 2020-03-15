const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, CALLBACK_URL } = require('../app');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    CALLBACK_URL,
  },

  async (accessToken, refreshToken, profile, done) => {
    try {
      const loginedUser = {
        githubId: profile.id,
      };

      const user = await User.find(loginedUser);
      if (user.length) {
        return done(null, user[0]);
      } else {
        const user = await User.create({
          name: profile.username,
          githubId: profile.id,
          githubUrl: profile.profileUrl,
          imageUrl: profile.photos[0].value,
          solved: []
        });
        done(null, user);
      }
    } catch (err) {
      done(err);
    }
  }
));

module.exports = passport;
