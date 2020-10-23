const express = require('express');

const Problems = require('../models/Problem');
const gradeTests = require('./middleware/gradingTests');
const isAuthenticated = require("./middleware/authentication");

const router = express.Router();

router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const problem = await Problems.findOne({ _id: req.params.id });

    if (!problem) {
      throw new Error('Not Found');
    }

    res.render('problems', {
      id: problem.id,
      title: problem.title,
      completed_users: problem.completed_users,
      difficulty_level: problem.difficulty_level,
      description: problem.description,
      count: problem.tests.length,
      tests: problem.tests,
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      err.status = 404;
    }
    next(err);
  }
});

router.post('/:id', (req, res, next) => {
  next();
}, gradeTests);

module.exports = router;
