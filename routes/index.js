const express = require('express');
const router = express.Router();
const Problems = require('../models/Problem');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const problems = await Problems.find({});
    res.render('index', {
      problems: problems,
      userInfo: req.user,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
