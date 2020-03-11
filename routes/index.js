const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem'); 

/* GET home page. */
router.get('/', async(req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect('/login');
    }
  
    const problems = await Problem.find();
    res.render('index', { problems });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
