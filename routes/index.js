const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

const authenticateUser = (req, res, next) => {
  if(req.user){
    next();
  } else {
    res.status(301).redirect('/login');
  }
};

router.get('/', authenticateUser, async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();
    res.render('index', { title: 'HOME', problems });
  } catch(e) {
    next(e);
  }
});

module.exports = router;
