const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem'); 

router.get('/', async(req, res, next) => {
  res.send('hi');
});

router.get('/:id', async(req, res, next) => {
  if (!req.session.passport) {
    return res.redirect('/login');
  }
  console.log(req.params)

  const problems = await Problem.find();
  res.send('hi');
});

module.exports = router;
