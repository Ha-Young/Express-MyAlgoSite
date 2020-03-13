const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const errors = require("../lib/error");
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/login/github/callback'
}, async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await User.findOne({ githubid: profile.id });
      if (user) {
        cb(null, user);
      } else {
        const user = await User.findOne({ username: profile.username });
        const reg = /[^A-PS-Z0-9]+/i;
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
