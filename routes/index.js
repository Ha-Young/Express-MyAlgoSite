const express = require('express');
const Problems = require('../models/Problem');
const isAuthenticated = require('./middleware/authentication');

const router = express.Router();

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const problems = await Problems.find({});

    if (!problems) {
      next(err);
    }

    res.render('index', { problems: problems });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
