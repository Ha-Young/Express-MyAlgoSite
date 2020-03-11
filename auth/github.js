const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');
const createError = require('http-errors');
const User = require('../models/User');
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, CALLBACK_URL } = require('../app');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await User.findById(id);
      done(null, user);
    } else {
      done(createError(404, 'User Not Found'));
    }
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
      if (user) {
        done(null, user)
      } else {
        done(createError(404, 'User Not Found'));
      }
    } catch (err) {
      done(err)
    }
  }
));

module.exports = passport;
