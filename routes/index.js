const router = require('express').Router();
const { isLoggedIn } = require('./middlewares');
const Problem = require('../models/Problem');

/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
  try {
    Problem.find({}, function (err, problems) {
      res.render('index', {
        title: 'Codewars',
        username: req.user.username,
        problems
      });
    });
  } catch (err) {
    next();
  }
});

module.exports = router;
