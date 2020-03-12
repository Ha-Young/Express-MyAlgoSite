const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', async(req, res, next) => {
  try{
    if(req.isAuthenticated()){
      res.render('login', { hasLoggedIn: true });
    } else{
      res.render('login', { hasLoggedIn: false });
    }
  } catch (error) {
    res.render('login', { hasLoggedIn: false });
  }
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github'),async (req, res) => {
  res.redirect('/');
});

module.exports = router;
