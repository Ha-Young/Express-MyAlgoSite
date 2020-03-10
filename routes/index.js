const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem'); 

/* GET home page. */
router.get('/', async(req, res, next) => {
  if (!req.session.passport) {
    return res.redirect('/login');
  }

  const problems = await Problem.find();
  res.render('index', { problems });
});

module.exports = router;
