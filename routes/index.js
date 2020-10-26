const express = require('express');
const router = express.Router();
const { authenticate } = require('./middlewares/authentication');
const { getAllProblems } = require('./middlewares/problems');

router.get('/',
  authenticate,
  getAllProblems,
  (req, res, next) => {
    res.render('index', {
      problems: req.problems,
      username: req.user.username,
  });
});

module.exports = router;
