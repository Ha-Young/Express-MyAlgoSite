const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, CALLBACK_URL } = require('../app');

passport.serializeUser(function(user, done) {
  try {
    done(null, user.id);
  } catch(err) {
    next(err);
  }
});

passport.deserializeUser(function(id, done) {
  try {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  } catch(err) {
    next(err);
  }
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    CALLBACK_URL,
  },

  async function(accessToken, refreshToken, profile, done) {
    const loginedUser = {
      githubId: profile.id,
    };

    const newUser = {
      name: profile.username,
      githubId: profile.id,
      githubUrl: profile.profileUrl,
      imageUrl: profile.photos[0].value,
      solved_level: {
        difficulty_level_one: 0,
        difficulty_level_two: 0,
        difficulty_level_three: 0,
      },
      solved_all_cout: 0,
      solved: [],
    };

    const options = {
      new: true,
      upsert: true
    };

    const user = await User.findOneAndUpdate(loginedUser, newUser, options);
    try {
      done(null, user);
    } catch(err) {
      done(err);
    }
  }
));

module.exports = passport;
