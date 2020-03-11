require('dotenv').config();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
// const keys = require('./keys');
const errors = require("../lib/error");
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

////process.env.session 
passport.use(new GitHubStrategy({
  clientID: 'c7c7f4510b35c7a03e14',
  clientSecret: '31c5907aabb8eacf067774a811205caedd8ea86e',
  callbackURL: '/login/github/callback'
}, async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await User.findOne({ githubid: profile.id });
      if (user) {
        cb(null, user);
      } else {
        const user = await User.findOne({ username: profile.username });
        var reg = /[^A-PS-Z0-9]+/i;
        if (user) throw new errors.DuplicateError('중복된 값에러', '이름');
        if (reg.test(profile.username)) throw new errors.ValidationError('잘못된 유저이름', '유저이름');
        const newUser = await new User({ githubid: profile.id, username: profile.username }).save();
        cb(null, newUser);
      }
    } catch (err){
      next(err);
    } 
  }
));
