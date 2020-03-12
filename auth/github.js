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
  
      const newUser = {
        name: profile.username,
        githubId: profile.id,
        githubUrl: profile.profileUrl,
        imageUrl: profile.photos[0].value,
        solvedAllCount: 0,
        solvedLevelOne: 0,
        solvedLevelTwo: 0,
        solvedLevelThree: 0,
        solved: [],
      };

      const options = {
        new: true,
      };

      const user = await User.findOneAndUpdate(loginedUser, newUser, options);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
));

module.exports = passport;
