const express = require('express');
const router = express.Router();

/* GET home page. */
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/auth');
};

router.get('/', isAuthenticated, (req, res, next) => {
  res.render('index', { user: req.user.username });
});

module.exports = router;
