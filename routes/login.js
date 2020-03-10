const express = require('express');
const router = express.Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET_KEY,
  callbackURL: "http://localhost:3000/login/auth/github/callback"
},
(accessToken, refreshToken, profile, done) => {
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
  //   console.log(user);
  //   return cb(err, user);
  // });
  done(null, profile);
}));

passport.serializeUser((user, done) => {
  // console.log('serializeUser', user)
  done(null, user);
});
passport.deserializeUser((user, done) => {
  // console.log('deserializeUser', user)
  done(null, user);
});

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/login',
    successRedirect: '/'
  })
);

router.get('/logout', async(req, res, next) => {
  await req.logout();
  await req.session.save();
  res.render('login');
});

module.exports = router;
