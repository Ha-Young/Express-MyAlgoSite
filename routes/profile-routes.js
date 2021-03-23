const express = require('express');
const router = express.Router();

const authCheck = (req, res, next) => {
  // check logged in or not
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  res.render('profile', { user: req.userInfo });
});

module.exports = router;
