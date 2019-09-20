const router = require('express').Router();
const Problem = require('../models/Problem');

/* GET home page. */

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/', authCheck, (req, res, next) => {
  Problem.find({}).then(data => {
    res.render('index', {
      user: req.user,
      problems: data,
      thumbnail: req.thumbnail,
    });
  });
});

module.exports = router;
