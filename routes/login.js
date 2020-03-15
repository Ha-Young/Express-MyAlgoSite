const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_KEY,
      callbackURL: 'http://localhost:3000/login/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { login, email, id } = profile._json;
        const user = await User.findOne({ github_id: id });

        if (user) {
          done(null, profile);
        } else {
          const newUser = new User({
            username: login,
            email,
            github_id: id
          });

          await newUser.save();
          done(null, profile);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (githubId, done) => {
  try {
    const user = await User.findOne({ github_id: githubId });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/auth/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/'
  })
);

module.exports = router;
