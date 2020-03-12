const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/', async (req, res, next) => {
  if(req.isAuthenticated()){
    const problems = await Problem.find({});
    res.render('index', { hasLoggedIn: true, problems: problems });
  } else{
    res.render('login', { hasLoggedIn: false });
  }
});

module.exports = router;

