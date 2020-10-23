const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/', async function (req, res, next) {
  try {
    const problemList = await Problem.find();

    if (req.session.passport) {
      return res.render('index', {
        problemList: problemList
      });
    }

    return res.redirect('/login');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
