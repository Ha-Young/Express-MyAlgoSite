const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem'); 

/* GET home page. */
router.get('/', async(req, res, next) => {
  if (!req.user) return res.redirect('/login');

  try {
    const problems = await Problem.find();
    const username = req.user.username;

    res.render('index', { problems, username });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
