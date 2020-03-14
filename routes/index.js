const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem')

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};

/* GET home page. */
router.get('/', authenticateUser, (req, res, next) => {
  Problem.find(function (err, problem) {
    const id = problem.map(x => x.id);
    const title = problem.map(x => x.title);
    const completed_users = problem.map(x => x.completed_users);
    const difficulty_level = problem.map(x => x.difficulty_level);
    res.render('index',
      { id: id,
        title: title,
        completed_users: completed_users,
        difficulty_level: difficulty_level
      }
    );
  })
});

module.exports = router;