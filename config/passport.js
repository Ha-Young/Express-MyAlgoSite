require('dotenv').config();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const keys = require('./keys');
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
  const user = await User.findOne({ username: profile.username });
  if (user) {
    cb(null, user);
  } else {
    const newUser = await new User({
      githubid: profile.id,
      username: profile.username
    }).save();
    cb(null, newUser);
  }
  }
));



// User.findOne({ username: profile.username }).then((user) => {
//   if (user) {
//     cb(null, user);
//   } else {
//     new User({
//       githubid: profile.id,
//       username: profile.username
//     }).save().then((newUser) => {
//       cb(null, newUser);
//     });
//   }
// });