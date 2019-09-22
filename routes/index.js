const router = require('express').Router();
const Problem = require('../models/Problem');
const ensureAuthenticated = require('../utils/ensure-auth');

/* GET home page. */

router.get('/', ensureAuthenticated, (req, res, next) => {
  Problem.find({}).then(data => {
    res.render('index', {
      user: req.user,
      problems: data,
      thumbnail: req.thumbnail,
    });
  });
});

module.exports = router;
